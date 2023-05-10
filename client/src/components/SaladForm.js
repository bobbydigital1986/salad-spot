import React, { useState } from "react";
import ErrorList from "./layout/ErrorList"
import translateServerErrors from "../services/translateServerErrors"
import { Redirect } from "react-router-dom"
import Dropzone from "react-dropzone"

const SaladForm = (props) => {
    const [images, setImages] = useState([])
    const [newImageFormData, setNewImageFormData] = useState({
        image: {}
    })

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
        postSalad(newSalad, newImageFormData)
    }
    
    const handleImageUpload = (acceptedImage) => {
        setNewImageFormData({
          ...newImageFormData,
          image: acceptedImage[0]
        })
    }

    const postSalad = async (newSaladData, newImageFormData) => {
        const formData = new FormData()
        formData.append('saladData', newSaladData)
        formData.append('image', newImageFormData)
      
        try {
          const response = await fetch('/api/v1/salads', {
            method: 'POST',
            headers: ({
                "Content-Type": "application/json",
                "Accept": "image/jpeg"
            }),
            body: formData
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
            setShouldRedirect({ status: true, newSaladId: updatedSalad.id })
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
                <div className='callout primary'>
                <Dropzone onDrop={handleImageUpload}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Upload Your Salad Image - drag 'n' drop or click to upload</p>
                            <div>
                                <label htmlFor="fileInput">Choose file:</label>
                                <input type="file" id="fileInput" />
                                <button onClick={handleImageUpload}>Upload</button>
                            </div>
                            </div>
                        </section>
                        )}
                </Dropzone>
                </div>
                <input className="button" type="submit" value="Add" />
            </form>

        </div>
    )
}

export default SaladForm