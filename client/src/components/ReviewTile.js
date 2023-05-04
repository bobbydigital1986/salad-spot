import React from "react"

const ReviewTile = ({ name, reviewBody }) => {

    return(
        <>
            <h3>{name}</h3>
            <p>{reviewBody}</p>
        </>
    )
}

export default  ReviewTile