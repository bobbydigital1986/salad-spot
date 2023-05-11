import React from "react";

const VotingButton = ({ salad, voteMaker, user, userVote }) => {
    let addDisabled
    let subtractDisabled
    const matchingVote = salad?.votes.find((vote) => vote.userId === user?.id)

    if (!user) {
        addDisabled = true
        subtractDisabled = true
    } else {
        //Logic handling vote status in SaladList
        if (matchingVote?.vote >= 1) {
            addDisabled = true
            subtractDisabled = false
        } else if (matchingVote?.vote <= -1) {
            addDisabled = false
            subtractDisabled = true
        } 
    
        //Logic handling vote status in SaladShow
        if (!userVote && !matchingVote) {
            addDisabled = false
            subtractDisabled = false
        } else if (userVote >= 1) {
            addDisabled = true
            subtractDisabled = false
        } else if (userVote <= -1) {
            addDisabled = false
            subtractDisabled = true
        } 
    }

    const addVote = () => {
        return voteMaker(1, salad)
    }

    const subtractVote = () => {
        return voteMaker(-1, salad)
    }

    return (
        <div className="voting-show-section">
            <button className="button" onClick={addVote} disabled={addDisabled}>Fresh</button>
            <p className="vote-count">{salad?.rating}</p>
            <button className="button" onClick={subtractVote} disabled={subtractDisabled}>Wilted</button>
        </div>
    )
}

export default VotingButton