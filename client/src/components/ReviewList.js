import React from "react";
import ReviewTile from "./ReviewTile";

const ReviewList = (props) => {
    const reviewList = props.reviews.map((review)=>{
        console.log(review)
        return(
            <ReviewTile 
                key={review.id}
                body={review.body}
                createdAt={review.createdAt}
                user={review.user}
            />
        )   
    })
    return(
        <div className="callout review-tile">
            <h4>Reviews</h4>
            {reviewList}
        </div>
    )
}

// id={review.id}
// body={review.body}
// userEmail={review.user.email}
// createdAt={review.createdAt}

export default ReviewList