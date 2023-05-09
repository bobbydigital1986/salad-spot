import React, { useState } from "react";
import ErrorList from "./layout/ErrorList"
import translateServerErrors from "../services/translateServerErrors"
import { Redirect } from "react-router-dom"

const SaladForm = (props) => {

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
        postSalad(newSalad)
    }

    const postSalad = async (newSaladData) => {
        try{
            const response = await fetch(`/api/v1/salads/new`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(newSaladData)
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
                const updatedSalad = responseBody.salads
                setNewSalad({ ...newSalad, id: updatedSalad.id })
                setShouldRedirect(true)
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    if (shouldRedirect) {
        return <Redirect push to={`/salads/${newSalad.id}`}/>
    }

    return (
        <div className="callout review-title">
            <h1>Add a New Salad</h1>
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
                <input className="button-group" type="submit" value="Submit"/>
            </form> 
        </div>
    )
}

export default SaladForm