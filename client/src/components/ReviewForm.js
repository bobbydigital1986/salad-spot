import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";

const ReviewForm = ({ postReview, errors }) => {
    const [newReview, setNewReview] = useState({
        body: ""
    })

    const handleChange = (event) => {
        setNewReview({
            ...newReview,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postReview(newReview)
        clearForm()
    }

    const clearForm = () => {
        setNewReview({
            body: ""
        })
    }

    return (            
        <div className="review-tile callout">
            <h4>Leave a Review</h4>
            <ErrorList errors={errors}/>
            <form onSubmit={handleSubmit}>
                <label>
                    Review:
                    <input
                        type="text"
                        name="body"
                        onChange={handleChange}
                        value={newReview.body}
                    />
                </label>
                <div className="button-group">
                    <input className="button" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default ReviewForm