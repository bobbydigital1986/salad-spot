class saladSerializer {
    static async voteDetails(salad) {
        const saladVotes = await salad.$relatedQuery("votes")
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