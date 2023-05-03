import React, { useState } from "react";

const NewReviewForm = ({ postReview }) => {
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
        <>
            <h3>Leave a Review</h3>
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
        </>
    )
}

export default NewReviewForm