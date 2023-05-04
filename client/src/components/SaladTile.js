import React from "react";
import { Link } from "react-router-dom"

const SaladTile = (props) => {
    const { name, description, id, user } = props.salad 
    
    return (
        <>
            <li><Link to={`/salads/${id}`}>{name}</Link></li>
            <p>{description}</p>
            <h4 className='submitted-by'>Submitted by {user}</h4>
        </>
    )
}

export default SaladTile