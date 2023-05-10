import React from "react";

const VotingButton = ({ salad, voteMaker, user }) => {
    console.log("Salad", salad)
    let addDisabled
    let subtractDisabled
    const matchingVote = salad?.votes.find((vote) => vote.userId === user?.id)

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

    const addVote = () => {

        voteMaker(1, salad)
    }

    const subtractVote = () => {
        voteMaker(-1, salad)
    }

    return (
        <>
            <button className="button" onClick={addVote} disabled={addDisabled}>Fresh</button>
            <p className="vote-count">{salad?.rating}</p>
            <button className="button" onClick={subtractVote} disabled={subtractDisabled}>Wilted</button>
        </>
    )
}

export default VotingButton