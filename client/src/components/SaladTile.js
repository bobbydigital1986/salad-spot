import React from "react";
import { Link } from "react-router-dom"

const SaladTile = (props) => {
    const { name, description, id } = props.salad 
    return (
        <div>
        <li>{name}</li>
        <p>{description}</p>
        </div>
    )
}

export default SaladTile