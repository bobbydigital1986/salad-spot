import React from "react"
import getNiceDate from "../services/getNiceDate"

const ReviewTile = ({ user, body, createdAt }) => {
    
    const monthDay = getNiceDate(createdAt)
    
    return( 
        <div className="review-tile callout">
            <h6>{user.email} {monthDay}</h6>
            <p>{body}</p>
        </div>
        
    )
}

export default  ReviewTile