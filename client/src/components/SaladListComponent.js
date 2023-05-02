import React, { useState, useEffect } from "react"

const SaladListComponent = (props) => {

    const [salads, setSalads] = useState([])

    const getSalads = async() =>{
        try{
            const response = await fetch("/api/v1/salads")
            if(!response.ok){
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const responseBody = await response.json()
            setSalads(responseBody.salads)
        }catch(error){
            console.error(`Error in Fetch: ${error.message}`)
        }
    }

    useEffect(()=> {
        getSalads()
    }, [])

    const saladItems = salads.map((salad)=> {
        return (
            <li>salad.name</li>
        )
    })

    return (
        <div>
        <h1>My Salad List</h1>
        <ul>{saladItems}</ul>
        </div>
    )
    
}


export default SaladListComponent