import express from 'express'
import { Vote} from "../../../models/index.js"

const voteRouter = new express.Router()

// nested router
voteRouter.post("/", async(req, res) =>{
    const { body } = req
    const voteLookup = await Vote.query().findOne(body)
    try {
        if (!voteLookup) {
            const voteLookupSansVote = await Vote.query().findOne({ saladId: body.saladId, userId: body.userId })
            if (voteLookupSansVote) {
                // recalculate vote count for the review to send back to front-end
                const newVote = await Vote.query().patchAndFetchById(voteLookupSansVote.id, { vote: body.vote })
                return res.status(200).json({ newVote })
    
            } else {
                const newVote = await Vote.query().insert({ vote: body.vote, userId: body.userId, saladId: body.saladId })
                return res.status(201).json({ newVote })
            }
        } else {
            res.status(304).json({ body })
        }
    } catch(err) {
        res.status(500).json({ errors: err })
    }

})

export default voteRouter