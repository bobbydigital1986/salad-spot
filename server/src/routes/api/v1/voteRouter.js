import express from 'express'
import { Vote } from "../../../models/index.js"

const voteRouter = new express.Router()

voteRouter.post("/", async(req, res) =>{
    const { body } = req
    const user = req.user
    const exactVoteLookup = await Vote.query().findOne({ saladId: body.saladId, vote: body.vote, userId: user.id })
    try {
        if (!exactVoteLookup) {
            const differentVoteLookup = await Vote.query().findOne({ saladId: body.saladId, userId: user.id })
            if (differentVoteLookup) {
                const newVote = await Vote.query().patchAndFetchById(differentVoteLookup.id, { vote: body.vote })
                
                return res.status(200).json({ newVote })
            } else {
                const newVote = await Vote.query().insert({ vote: body.vote, userId: user.id, saladId: body.saladId })
                return res.status(201).json({ newVote: newVote })
            }
        } else {
            return res.status(304).json({ body })
        }
    } catch(err) {
        res.status(500).json({ errors: err })
    }
})

export default voteRouter