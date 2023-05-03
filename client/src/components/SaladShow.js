import React, {useState, useEffect } from "react";
import newReviewForm from "./NewReviewForm";

const SaladShow = (props) =>{
    const [salad, setSalad] = useState({
    })
    const [errors, setErrors] = useState([])
    
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
            setSalad(responseBody.salad)
        } catch(error) {
            console.error(`Error in Fetch ${error.message}`)
        }
    }

    useEffect(() => {
        getSalad()
    }, [])

    const postReview = async (newReview) => {
        try {
            const saladId = props.match.params.id
            const response = await fetch(`/api/v1/salads/${saladId}/reviews`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(newReview)
            })
            if (!response.ok) {
                if(response.status === 422) {
                    const body = await response.json()
                    return setErrors(body.errors)
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                    throw(error)
                }
            } else {
                const body = await response.json()
                const updatedReviews = salad.reviews.concat(body.review)
                setErrors([])
                setSalad({...salad, reviews: updatedReviews})
            }
        } catch(error) {
            console.error(`Error in Fetch ${error.message}`)
        }
    }


    let descriptionSection
    if (salad.description) {
        descriptionSection = <p>Salad description: {salad.description}</p>
    }

    return (
        <>
            <h1>Rate my Salad</h1>
            <h2>{salad.name}</h2>
            {descriptionSection}
            <h3>Reviews</h3>
            <newReviewForm postReview={postReview} />
        </>
    )
}

export default SaladShow