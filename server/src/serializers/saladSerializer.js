class saladSerializer {
    static async voteDetails(salad) {
        // console.log("serializer salad argument",  salad)

        const saladVotes = await salad.$relatedQuery("votes")
        // console.log("serializer salad votes related query", saladVotes)
        salad.votes = saladVotes
        if (saladVotes.length > 1) {
            salad.rating = saladVotes.reduce((a, b) => a.vote + b.vote)
        } else if (salad.votes.length == 1) {
            salad.rating = salad.votes[0].vote
        }
        else {
            salad.rating = 0
        }
        
        return salad
    }
}

export default saladSerializer