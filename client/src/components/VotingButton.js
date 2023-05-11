import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faPlantWilt } from "@fortawesome/free-solid-svg-icons";

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
            <button className="button fresh" onClick={addVote} disabled={addDisabled}><FontAwesomeIcon icon={faCarrot} className='icon' /></button>
            <p className="vote-count">{salad?.rating}</p>
            <button className="button wilted" onClick={subtractVote} disabled={subtractDisabled}><FontAwesomeIcon icon={faPlantWilt} className='icon' /></button>
        </div>
    )
}

export default VotingButton