import React from "react";
import { Link } from "react-router-dom"
import VotingButton from "./VotingButton";

const SaladTile = (props) => {
    const { name, description, id, user, imageURL } = props.salad

    return (
        <div className="salad-box salad-list grid-x">
            <li className="salad-name"><Link to={`/salads/${id}`}>{name}</Link></li>
            <div className="voting-button">
            <VotingButton 
                user={props.user}
                salad={props.salad}
                voteMaker={props.voteMaker}
            />
            </div>
            <p className="salad-description">{description}</p>
            <img src={imageURL} className='tile-image' />
            <h4 className='submitted-by'>Submitted by {user}</h4>
        </ div>
    )
}

export default SaladTile