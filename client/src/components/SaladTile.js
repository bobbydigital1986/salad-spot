import React from "react";
import { Link } from "react-router-dom"
import VotingButton from "./VotingButton";
import getNiceDate from "../services/getNiceDate";

const SaladTile = (props) => {
    const { name, description, id, user, imageURL, createdAt } = props.salad

    const monthDay = getNiceDate(createdAt)


    return (
        <div className="salad-box salad-list">
            <div className="grid-x">
                <h3 className="salad-name cell small-6"><Link to={`/salads/${id}`}>{name}</Link></h3>
                {/* <span className="cell auto"/> */}
                <h4 className='submitted-by cell auto'>Submitted by {user} on {monthDay}</h4>
            </div>
            <div className="grid-x">
                <div className="voting-button cell small-2">
                    <VotingButton 
                        user={props.user}
                        salad={props.salad}
                        voteMaker={props.voteMaker}
                    />
                </div>
                <div className='tile-image cell small-5'>
                    <img src={imageURL}/>

                </div>
                <p className="salad-description cell small-5">{description}</p>

            </div>
        </ div>
    )
}

export default SaladTile