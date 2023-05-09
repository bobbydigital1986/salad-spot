import React, { useState, useEffect } from "react"
import SaladTile from "./SaladTile"

const SaladList = (props) => {

    const [salads, setSalads] = useState([])
    const [votes, setVotes] = useState([])

    const getSalads = async() => {
        try{
            const response = await fetch("/api/v1/salads")
            if(!response.ok){
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const responseBody = await response.json()
            setSalads(responseBody.salads)
        } catch(error) {
            console.error(`Error in Fetch: ${error.message}`)
        }
    }

    useEffect(()=> {
        getSalads()
    }, [])

    const postVote = async({vote}) => {
        console.log("hey there")
        try {
            const response = fetch("/api/v1/vote", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ vote })
            })
            if (!response.ok) {
                if(response.status === 422) {
                    const errorBody = await response.json()
                    const newErrors = translateServerErrors(errorBody.errors.data)
                    return setErrors(newErrors)
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`
                    const error = new Error(errorMessage)
                    throw(error)
                }
            } else {
                const body = await response.json()
                const newSalads = salads.map(salad => {
                    if (salad.id === body.vote.saladId) {
                        salad.vote = body.vote.rating
                        return salad
                    }
                    return salad
                    
                })
                setSalads(newSalads)

            }
        } catch (error) {
            console.log(error)
        }    
    }

    const saladItems = salads.map((salad)=> {
        return (
            <SaladTile
                key={salad.id}
                salad={salad}
                postVote={postVote}
            />
        )
    })

    return (
        <>
            <h1>My Salad List</h1>
            <ul>{saladItems}</ul>
        </>
    )
}

export default SaladList