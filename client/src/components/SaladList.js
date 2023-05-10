import React, { useState, useEffect } from "react"
import SaladTile from "./SaladTile"
import postVote from "../services/postVote"

const SaladList = (props) => {

    const [salads, setSalads] = useState([])

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

    const voteMaker = async(vote, salad) => {
        // console.log("voteMaker initialized", vote, salad)
        const newSalad = await postVote(vote, salad)
        console.log("newSalad", newSalad)
        const saladArray = salads.map((salad) => {
            if (salad?.id === newSalad?.id) {
                return newSalad
            } else {
                return salad
            }
        })

        setSalads(saladArray)
    }


    const saladItems = salads.map((salad)=> {
        return (
            <SaladTile
                key={salad.id}
                salad={salad}
                user={props.user}
                voteMaker={voteMaker}
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