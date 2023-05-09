import React, { useState } from "react";
import postVote from "../services/postVote";

const VotingButton = (props) => {
    const [voteCount, setVoteCount] = useState(0)
    const [addDisabled, setAddDisabled] = useState(false)
    const [subtractDisabled, setSubtractDisabled] = useState(false)

    const addVote = () => {
        if(addDisabled === false){
            setAddDisabled(true)
            setSubtractDisabled(false)
            setVoteCount(voteCount + 1)
            postVote(1, props.salad?.id, props.user?.id)
        } if (subtractDisabled === true){
            setAddDisabled(true)
            setSubtractDisabled(false)
            setVoteCount(voteCount + 2)
            postVote(1, props.salad?.id, props.user?.id)
        }
    }

    const subtractVote = () => {
        if(subtractDisabled === false){
            setSubtractDisabled(true)
            setAddDisabled(false)
            setVoteCount(voteCount - 1)
            postVote(-1, props.salad?.id, props.user?.id)
        } if (addDisabled === true) {
            setSubtractDisabled(true)
            setAddDisabled(false)
            setVoteCount(voteCount - 2)
            postVote(-1, props.salad?.id, props.user?.id)
        }
    }

    return (
        <>
            <button className="button" onClick={addVote} disabled={addDisabled}>Fresh</button>
            <p className="vote-count">{voteCount}</p>
            <button className="button" onClick={subtractVote} disabled={subtractDisabled}>Wilted</button>
        </>
    )
}

export default VotingButton