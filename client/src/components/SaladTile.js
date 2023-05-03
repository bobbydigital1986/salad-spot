import React from "react";
import { Link } from "react-router-dom"

const SaladTile = (props) => {
    const { name, description, id } = props.salad 
    return (
        <>
            <li><Link to={`/salads/${id}`}>{name}</Link></li>
            <p>{description}</p>
        </>
    )
}

export default SaladTile