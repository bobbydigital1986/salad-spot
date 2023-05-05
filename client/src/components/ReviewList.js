import React from "react";
import ReviewTile from "./ReviewTile";

const ReviewList = (props) => {
    const reviewList = props.reviews.map((review)=>{
        return(
            <ReviewTile 
                key={review.id}
                reviewSaladId={review.saladId}
                body={review.body}
            />
        )   
    })
    return(
        <>
            {reviewList}
        </>
    )
}

export default ReviewList