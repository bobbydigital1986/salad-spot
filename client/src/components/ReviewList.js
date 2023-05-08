import React from "react";
import ReviewTile from "./ReviewTile";

const ReviewList = (props) => {
    const reviewList = props.reviews.map((review)=>{
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

export default ReviewList