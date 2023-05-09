import React, { useState, useEffect } from "react";
import getNiceDate from "../services/getNiceDate";
import { Link } from "react-router-dom"

const UserSaladList = (props) => {
    const [userSalads, setUserSalads] = useState([])
    
    const getUserSalads = async () => {
        try {
            const response = await fetch("/api/v1/users")
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const body = await response.json()
            setUserSalads(body.user.salads)
        } catch (error){
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getUserSalads()
    }, [])
    
    const userSaladListItems = userSalads.map(saladObject => {
        const monthDay = getNiceDate(saladObject.createdAt)

        return(
            <li className="user-salad-list" key={saladObject.id}>
                <h4><Link to={`/salads/${saladObject.id}`}>{saladObject.name}</Link></h4>
                <h5>Posted at: {monthDay}</h5>
            </li>
        )
    })

    return(
        <>
            {userSaladListItems}
        </>
    )
}

export default UserSaladList