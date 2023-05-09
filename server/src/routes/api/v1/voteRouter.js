import express from 'express'
import { Vote, User, Salad} from "../../../models/index.js"

const voteRouter = new express.Router()

voteRouter.post("/", async(req, res) =>{
    // rating: 1
    // userId: 3
    // saladId: 4
    const { body } = req
    const voteLookup = await Vote.query().findOne({ body })
    try {
        if (!voteLookup) {
            const voteLookupSansVote = await Vote.query().findOne({ saladId: body.saladId, userId: body.userId })
            if (voteLookupSansVote) {
                const newVote = await Vote.query()
                    .patchAndFetchById(voteLookupSansVote.id, { rating: body.rating })
                return res.status(200).json({ newVote })
    
            } else {
                const newVote = await Vote.query().insert({ body })
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