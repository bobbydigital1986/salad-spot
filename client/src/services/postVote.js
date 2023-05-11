const postVote = async(vote, salad) => {
    try {
        const response = await fetch("/api/v1/vote", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({ vote, saladId: salad.id })
        })
        if (!response.ok) {
            if(response.status === 422) {
                const errorBody = await response.json()
                const newErrors = translateServerErrors(errorBody.errors.data)
                return setErrors(newErrors)
            } else if (response.status == 304) {
                return salad
            } else {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
        }  else {
            const body = await response.json()
            const matchingVote = salad.votes.find((vote) => vote.id === body.newVote.id)
            if (matchingVote) {
                    salad.votes = salad.votes.map(existingVote => {
                    if (existingVote?.id === body.newVote?.id) {
                        body.newVote.vote = body.newVote.vote * 2
                        return body.newVote
                    } else {
                        return existingVote
                    }
                })
                salad.rating = salad.rating + body.newVote.vote
                return salad

            } else {
                salad.votes = salad.votes.concat(body.newVote)
                salad.rating = salad.rating + body.newVote.vote
                return salad
            } 
        }
    } catch (error) {
        console.error(error)
    }
}

export default postVote