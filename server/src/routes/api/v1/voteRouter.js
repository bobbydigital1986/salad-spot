import express from 'express'
import { Vote} from "../../../models/index.js"

const voteRouter = new express.Router()

// nested router
voteRouter.post("/", async(req, res) =>{
    const { body } = req //should be { vote: 1 or -1, saladId: 1}
    const user = req.user
    const exactVoteLookup = await Vote.query().findOne({ saladId: body.saladId, vote: body.vote, userId: user.id })
    try {
        if (!exactVoteLookup) {
            const differentVoteLookup = await Vote.query().findOne({ saladId: body.saladId, userId: user.id })
            if (differentVoteLookup) {
                // recalculate vote count for the review to send back to front-end
                const newVote = await Vote.query().patchAndFetchById(differentVoteLookup.id, { vote: body.vote })
                console.log("in differentVoteLookup - newVote", newVote)
                return res.status(200).json({ newVote }) // newVote = { id:, userId:, saladId:, vote:}
    
            } else {
                const newVote = await Vote.query().insert({ vote: body.vote, userId: user.id, saladId: body.saladId })
                console.log("missed differentVoteLookup - newVote", newVote)
                return res.status(201).json({ newVote: newVote })
            }
        } else {
            return res.status(304).json({ body })
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({ errors: err })
    }

})

export default voteRouter