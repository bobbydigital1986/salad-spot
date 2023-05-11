import React, {useState, useEffect } from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import getNiceDate from "../services/getNiceDate";
import translateServerErrors from "../services/translateServerErrors"
import VotingButton from "./VotingButton";
import postVote from "../services/postVote";
import { Redirect } from "react-router-dom";

const SaladShow = (props) =>{
    const [salad, setSalad] = useState({
        name: "",
        description: "",
        reviews: [],
        votes: [],
        imageURL: "",
        rating: 0
    })
    const [errors, setErrors] = useState([])
    const [reviews, setReviews] = useState([])
    const [userVote, setUserVote] = useState(0)
    const [shouldRedirect, setShouldRedirect] = useState(false)

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
            setUserVote(userVoteFinder(responseBody.salad.votes))
            setSalad(responseBody.salad)
            setReviews(responseBody.salad.reviews)
        } catch(error) {
            console.error(`Error in Fetch ${error.message}`)
        }
    }

    useEffect(() => {
        getSalad()
    }, [])

    const userVoteFinder = (votes) => {
        const matchingVote = votes.find((vote) => vote.userId === props.user?.id)
        return matchingVote?.vote
    }

    const voteMaker = async(vote, salad) => {
        const newSalad = await postVote(vote, salad)
        setUserVote(userVoteFinder(newSalad.votes))        
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

    let imageSection
    if (salad.imageURL) {
        imageSection = <img src={salad?.imageURL} className="salad-pics"/>
    }

    const monthDay = getNiceDate(salad?.createdAt)

    let editButton;
    
    const editSalad = () => {
        setShouldRedirect({ status: true, newSaladId: salad?.id })
    }

    if(props.user?.id === salad.userId){
        editButton = <button className="button" onClick={editSalad}>Edit Salad</button>
    }

    if(shouldRedirect){
        return <Redirect push to={`/salads/${shouldRedirect.newSaladId}/edit`}/>
    }

    return (
        <div className="callout review-tile">
            <h1>{salad.name}</h1>
            <VotingButton 
                voteMaker={voteMaker}
                salad={salad}
                user={props.user}
                userVote={userVote}
            />
            {imageSection}
            <br />
            {salad?.user?.username} {monthDay}
            {descriptionSection}
            {editButton}
            {reviewForm}
            <ReviewList reviews={reviews} />
        </div>
    )
}

export default SaladShow