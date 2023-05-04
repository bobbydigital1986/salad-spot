import React from "react";
import ReviewTile from "./ReviewTile";

const ReviewList = (props) => {
    const reviewList = props.reviews.map((review)=>{
        if (props.selectedSalad === review.saladId){
            return(
                <ReviewTile 
                    key={review.id}
                    reviewSaladId={review.saladId}
                    reviewName={review.name}
                    reviewDescription={review.reviewBody}
                />
            )
        }
    })
    return(
        <>
            {reviewList}
        </>
    )
}

export default ReviewList