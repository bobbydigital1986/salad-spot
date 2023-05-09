import React from "react";
import { Link } from "react-router-dom"
import { useState } from "react";

const SaladTile = (props) => {
    
    const { name, description, id, user, vote } = props.salad 
    const [voteStatus, setVoteStatus] = useState({
        vote
    })
    const handleClick = (event) => { 
        if (event.target === "upvote") {
            props.postVote(1)
        } else if (event.target === "downvote") {
            props.postVote(-1)
        }
    }

    let upVoteStyle = "gray"
    let downVoteStyle = "gray"

    if (voteStatus == -1) {
        downVoteStyle = "orange"
    } else if (voteStatus == 1) { 
        upVoteStyle = "orange"
    } else {

    }

    
    return (
        <>
            <li><Link to={`/salads/${id}`}>{name}</Link></li>
            <input className={`button ${upVoteStyle}`} name="upvote" onClick={handleClick} value="upvote"/>
            <input className={`button ${downVoteStyle}`} name="downvote" onClick={handleClick} value="downvote"/>
            <p>{description}</p>
            <h4 className='submitted-by'>Submitted by {user}</h4>
        </>
    )
}

export default SaladTile