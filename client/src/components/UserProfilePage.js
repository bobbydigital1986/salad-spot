import React, {useState, useEffect} from "react";

const UserProfilePage = (props) => {
    const [user, setUser] = useState([])
    const getUser = async() => {
        try{
            const response = await fetch("/api/v1/user-sessions/current")
            if(!response.ok){
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const responseBody = await response.json()
            setUser(responseBody)
        } catch(error) {
            console.error(`Error in Fetch: ${error.message}`)
        }
    }

    useEffect(()=> {
        getUser()
    }, [])

    return (
        <>
            <h2>Account Details</h2>
                <h4>Username: {user.username}</h4>
                <h4>Email: {user.email}</h4>
            <h2>Salads Posted:</h2>
        </>
    )
}

export default UserProfilePage