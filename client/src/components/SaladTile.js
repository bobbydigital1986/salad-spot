import React from "react";
import { Link } from "react-router-dom"
import { useState } from "react";
import VotingButton from "./VotingButton";

const SaladTile = (props) => {
    
    const { name, description, id, user } = props.salad




    // const handleClick = (event) => { 
    //     if (event.target === "upvote") {
    //         props.postVote(1, id, user.id)
    //     } else if (event.target === "downvote") {
    //         props.postVote(-1, id, user.id)
    //     }
    // }

    // let upVoteStyle = "gray"
    // let downVoteStyle = "gray"
    // let voteStatus = ""

    // if (voteStatus == -1) {
    //     downVoteStyle = "orange"
    // } else if (voteStatus == 1) { 
    //     upVoteStyle = "orange"
    // } else {

    // }

    
    return (
        <>
            <li><Link to={`/salads/${id}`}>{name}</Link></li>
            <VotingButton 
                user={props.user}
                salad={props.salad}
                voteMaker={props.voteMaker}
            />
            <p>{description}</p>
            <h4 className='submitted-by'>Submitted by {user}</h4>
        </>
    )
}

export default SaladTile