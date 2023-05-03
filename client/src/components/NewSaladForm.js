import React from "react";

const NewSaladForm = (props) => {

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
        clearForm()
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
                if (response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                }
            } else {
                const responseBody = await response.json()
                const updatedSalads = salads.name.concat(responseBody.salads)
                setErrors([])
                setNewSalad({salads: updatedSalads})
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    return (
        <>
        <h1>Add a New Salad</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                        <input
                            type="text"
                            name="name"
                            onChange={handleInputChange}
                            value={newSalad.name}
                        />
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
        </>
    )
}

export default NewSaladForm