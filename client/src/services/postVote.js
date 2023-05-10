
const updateTempRating = (salad, newVote) => {
    console.log(salad)
    console.log(newVote)
    salad.rating = salad.rating + newVote.vote
    console.log(salad)
    return salad
}


const postVote = async(vote, salad) => {
    try {
        // nested path POST "/api/v1/salad/saladId/votes"
        // don't send userId - server can access via req.user
        // vote = 1 / -1
        const response = await fetch("/api/v1/vote", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({ vote, saladId: salad.id })
        })
        console.log(response)
        if (!response.ok) {
            if(response.status === 422) {
                const errorBody = await response.json()
                const newErrors = translateServerErrors(errorBody.errors.data)
                return setErrors(newErrors)
            } else {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                console.log(error)
                throw(error)
            }
        } else {
            const body = await response.json()
            console.log(body)
            // Looks through existing salad's votes, and replaces the matching old vote with the new one
            const matchingVote = salad.votes.find((vote) => vote.id === body.newVote.id)
            console.log("salad.votes before mutation", salad.votes)
            console.log("matchingVote", matchingVote)
            console.log("body.newVote", body.newVote)
            if (matchingVote) {
                console.log("matching vote", salad)
                let newSalad = {...salad}
                newSalad.votes = salad.votes.map(existingVote => {
                    if (existingVote.id === body.newVote.id) {
                        return body.newVote
                    } else {
                        return existingVote
                    }
                })
                console.log("newSalad post matching", newSalad)

                return updateTempRating(newSalad, body.newVote.vote)
            } else {
                salad.votes = salad.votes.concat(body.newVote)
                console.log(salad)
                return updateTempRating(salad, body.newVote.vote)
            } 
        }
    } catch (error) {
        console.log(error)
    }
}

export default postVote