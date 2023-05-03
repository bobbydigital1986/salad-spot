import React, { useState } from "react";

const NewReviewForm = ({ postReview }) => {
    const [newReview, setNewReview] = useState({
        user: "",
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
            user: "",
            body: ""
        })
    }

    return (
        <>
            <h2>Leave a Review</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    User:
                    <input
                        type="text"
                        name="user"
                        onChange={handleChange}
                        value={newReview.name}
                    />
                </label>

                <label>
                    Review:
                    <input
                        type="text"
                        name="body"
                        onChange={handleChange}
                        value={newReview.review}
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