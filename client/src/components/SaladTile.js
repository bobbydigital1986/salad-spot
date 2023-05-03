import React from "react";
import { Link } from "react-router-dom"

const SaladTile = (props) => {
    const { name, description, id } = props.salad 
    return (
        <>
            <li>{name}</li>
            <p>{description}</p>
        </>
    )
}

export default SaladTile