import React, { useState, useEffect } from "react";
import ErrorList from "./layout/ErrorList"
import translateServerErrors from "../services/translateServerErrors"
import { Redirect } from "react-router-dom"
import cleanDBOutput from "../services/cleanDBOutput";

const SaladEditForm = (props) => {

    const [errors, setErrors] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [newSalad, setNewSalad] = useState({
        name: "",
        description: ""
    })

    const handleInputChange = (event) => {
        setNewSalad({
            ...newSalad,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        patchSalad()
    }

    const getSalad = async () => {
        try {
            const saladId = props.match.params.id
            const response = await fetch(`/api/v1/salads/${saladId}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const responseBody = await response.json()
            const updatedSalad = cleanDBOutput(responseBody.salad)

            setNewSalad({ name: updatedSalad.name, description: updatedSalad.description })
        } catch(error) {
            console.error(`Error in Fetch ${error.message}`)
        }
    }

    useEffect(() => {
        getSalad()
    }, [])

    if (shouldRedirect) {
        return <Redirect push to={`/salads/${shouldRedirect.newSaladId}`}/>
    }

    const patchSalad = async () => {
        const newSaladName = newSalad.name
        const newSaladDesc = newSalad.description
        const saladId = props.match.params.id

        try {
            const response = await fetch(`/api/v1/salads/${saladId}`, {
            method: 'PATCH',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({ name: newSaladName, description: newSaladDesc })
            })
            if (!response.ok) {
            if (response.status == 422) {
                const errorBody = await response.json()
                const newErrors = translateServerErrors(errorBody.errors.data)
                return setErrors(newErrors)
            } else {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
            }
            } else {
            const responseBody = await response.json()
            const updatedSaladRaw = responseBody.salad
            const updatedSalad = cleanDBOutput(updatedSaladRaw)
            setShouldRedirect({ status: true, newSaladId: updatedSalad.id })
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    const deleteSalad = async () => {
        const saladId = props.match.params.id

        try {
            const response = await fetch(`/api/v1/salads/${saladId}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            })
            if (!response.ok) {
            if (response.status == 422) {
                const errorBody = await response.json()
                const newErrors = translateServerErrors(errorBody.errors.data)
                return setErrors(newErrors)
            } else {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
            }
            } else {
            const responseBody = await response.json()
            setShouldRedirect({ status: true, newSaladId: "" })
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    return (
        <div className="callout review-title">
            <h1>Edit Salad</h1>
            <ErrorList errors={errors}/>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                        <input
                            type="text"
                            name="name"
                            onChange={handleInputChange}
                            value={newSalad.name}
                        />
                </label>
                <label>
                    Description:
                        <input
                            type="text"
                            name="description"
                            onChange={handleInputChange}
                            value={newSalad.description}
                        />
                </label>
                <input className="button" type="submit" defaultValue="Edit" />
            </form>
            <button className="button" onClick={deleteSalad}>Delete Post</button>
        </div>
    )
}

export default SaladEditForm