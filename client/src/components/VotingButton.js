import React, { useState } from "react";

const VotingButton = ({ salad, voteMaker }) => {
    // const [voteCount, setVoteCount] = useState(0)
    // const [addDisabled, setAddDisabled] = useState(false)
    // const [subtractDisabled, setSubtractDisabled] = useState(false)

    console.log("Salad passed into votingButton component", salad)

    let addDisabled
    let subtractDisabled
    const matchingVote = salad?.votes.find((vote) => vote.id === salad.id)
    // console.log("matchingVote result", matchingVote)
    if (matchingVote?.vote == 1) {
        addDisabled = true
        subtractDisabled = false
    } else if (matchingVote?.vote == -1) {
        addDisabled = false
        subtractDisabled = true
    } else if (!matchingVote) {
        addDisabled = false
        subtractDisabled = false
    }
    // console.log("addDisabled", addDisabled)
    // console.log("subtractDisabled", subtractDisabled)
    


    const addVote = () => {
        // console.log("salad passed into addvote", salad)
        // console.log(voteMaker)
        voteMaker(1, salad)
    }

    const subtractVote = () => {
        voteMaker(-1, salad)
    }
    // const addVote = () => {
    //     if(addDisabled === false){
    //         setAddDisabled(true)
    //         setSubtractDisabled(false)
    //         setVoteCount(voteCount + 1)
    //         // postVote(1, props.salad?.id, props.user?.id)
    //     } if (subtractDisabled === true){
    //         setAddDisabled(true)
    //         setSubtractDisabled(false)
    //         setVoteCount(voteCount + 2)
    //         postVote(1, props.salad?.id, props.user?.id)
    //     }
    //     props.voteMaker(1, props.salad)
    // }

    // const subtractVote = () => {
    //     if(subtractDisabled === false){
    //         setSubtractDisabled(true)
    //         setAddDisabled(false)
    //         setVoteCount(voteCount - 1)
    //         postVote(-1, props.salad?.id, props.user?.id)
    //     } if (addDisabled === true) {
    //         setSubtractDisabled(true)
    //         setAddDisabled(false)
    //         setVoteCount(voteCount - 2)
    //         postVote(-1, props.salad?.id, props.user?.id)
    //     }
    // }

    return (
        <>
            <button className="button" onClick={addVote} disabled={addDisabled}>Fresh</button>
            <p className="vote-count">{salad?.rating}</p>
            <button className="button" onClick={subtractVote} disabled={subtractDisabled}>Wilted</button>
        </>
    )
}

export default VotingButton