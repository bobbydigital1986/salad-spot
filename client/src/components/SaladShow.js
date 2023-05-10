import React, {useState, useEffect } from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import getNiceDate from "../services/getNiceDate";
import translateServerErrors from "../services/translateServerErrors"
import VotingButton from "./VotingButton";
import postVote from "../services/postVote";

const SaladShow = (props) =>{
    const [salad, setSalad] = useState({
        name: "",
        description: "",
        reviews: [],
        votes: [],
        rating: 0
    })
    const [errors, setErrors] = useState([])
    const [reviews, setReviews] = useState([])
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
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors.data)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                    throw(error)
                }
            } else {
                const body = await response.json()
                setErrors([])
                return setReviews([body.body, ...reviews])
            }
        } catch(error) {
            console.error(`Error in Fetch ${error.message}`)
        }
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
            setSalad(responseBody.salad)
            setReviews(responseBody.salad.reviews)
        } catch(error) {
            console.error(`Error in Fetch ${error.message}`)
        }
    }

    useEffect(() => {
        getSalad()
    }, [])

    const voteMaker = async(vote, salad) => {
        // console.log("voteMaker initialized", vote, salad)
        const newSalad = await postVote(vote, salad)
        console.log("newSalad", newSalad)

        setSalad(newSalad)
    }

    let descriptionSection
    if (salad?.description) {
        descriptionSection = <p>Salad description: {salad.description}</p>
    }

    let reviewForm
    if (props.user) { 
        reviewForm = (
            <ReviewForm
                postReview={postReview}
                errors={errors}
            />
        )
    }

    const monthDay = getNiceDate(salad?.createdAt)
    console.log(salad)
    return (
        <div className="callout review-tile">
            <h1>{salad.name}</h1>
            <VotingButton 
                voteMaker={voteMaker}
                salad={salad}
                user={props.user}
            />
            {salad?.user?.username} {monthDay}
            {descriptionSection}
            {reviewForm}
            <ReviewList reviews={reviews} />
        </div>
    )
}

export default SaladShow