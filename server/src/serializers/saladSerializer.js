class saladSerializer {
    static async voteDetails(salad) {
            
        const saladVotes = await salad.$relatedQuery("votes")
        salad.votes = saladVotes
        salad.rating = saladVotes.reduce((a, b), a + b)

        return salad
    }
}

export default saladSerializer