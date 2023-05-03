import React, { useState } from "react";

const newReviewForm = ({ postReview }) => {
    const [newReview, setNewReview] = useState({
        name: "",
        review: ""
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
            name: "",
            review: ""
        })
    }

    return (
        <>
            <h2>Leave a Review</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={newReview.name}
                    />
                </label>

                <label>
                    Review:
                    <input
                        type="text"
                        name="review"
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

export default newReviewForm