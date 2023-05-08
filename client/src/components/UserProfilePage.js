import React from "react";
import UserSaladList from "./UserSaladList"

const UserProfilePage = (props) => {
    return (
        <>
            <h2>Account Details</h2>
            <h4>Username: {props.user.username}</h4>
            <h4>Email: {props.user.email}</h4>
            <h2>Salads Posted:</h2>
            <UserSaladList />            
        </>
    )
}

export default UserProfilePage