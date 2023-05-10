import React from "react";
import { Link } from "react-router-dom"
import VotingButton from "./VotingButton";

const SaladTile = (props) => {
    
    const { name, description, id, user } = props.salad

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