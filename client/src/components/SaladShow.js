import React, {useState, useEffect } from "react";
import ReviewList from "./ReviewList";

const SaladShow = (props) =>{
    const [salad, setSalad] = useState({
        name: "",
        description: "",
        reviews: []
    })

    const [reviews, setReviews] = useState([])
    
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

    const getReviews = async () => {
        try {
            const saladId = props.match.params.id
            const response = await fetch(`/api/v1/salads/${saladId}/reviews`)

            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const responseBody = await response.json()
            setReviews(responseBody.review)
        }catch(error) {
            console.error(`Error in Fetch ${error.message}`)
        }
    }

    useEffect(() => {
        getSalad()
    }, [])

    useEffect(() => {
        getReviews()
    }, [])

    let descriptionSection
    if (salad.description) {
        descriptionSection = <p>Salad description: {salad.description}</p>
    }



    return (
        <>
            <h1>Rate my Salad</h1>
            <h2>{salad.name}</h2>
            {descriptionSection}
            <h4>Reviews</h4>
            {ReviewList}
        </>
    )
}

export default SaladShow