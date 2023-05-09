const postVote = async(vote, saladId, userId) => {
    try {
        // nested path POST "/api/v1/salad/saladId/votes"
        // don't send userId - server can access via req.user
        // vote = 1 / -1
        const response = fetch("/api/v1/vote", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({ vote, saladId, userId })
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
            //needs to be cleaned up
            const body = await response.json()
            const newSalads = salads.map(salad => {
                if (salad.id === body.vote.saladId) {
                    salad.vote = body.vote.vote
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

export default postVote