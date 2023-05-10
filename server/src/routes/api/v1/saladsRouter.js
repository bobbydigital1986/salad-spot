import express from "express"
import objection from "objection"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { User, Salad } from "../../../models/index.js"
import saladSerializer from "../../../serializers/saladSerializer.js"

const saladsRouter = new express.Router()

saladsRouter.get("/", async (req, res) => {
    try {
        const saladsSansUsers = await Salad.query()
        const salads = await Promise.all(saladsSansUsers.map( async (salad) => {
            const saladUser = await salad.$relatedQuery("user")
            salad.user = saladUser.username
            
            return saladSerializer.voteDetails(salad)
            //salad.votes = [array of votes]
            //salad.rating = sum of votes for salad
        }))

        return res.status(200).json({ salads: salads })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

saladsRouter.post("/new", async (req, res)=> {
    const { name, description } = req.body
    const { id } = req.user
    try {
        const postingUser = await User.query().findById(id)
        const cleanSalad = cleanUserInput({ name, description })
        const newSaladSansVote = await postingUser.$relatedQuery("salads").insertAndFetch(cleanSalad)
        const newSalad = saladSerializer(newSaladSansVote)
        return res.status(201).json({ salads: newSalad }) 
    } catch(error) {
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error })
        } else {
            return res.status(500).json({ errors: error })
        }
    }
})

saladsRouter.get("/:id", async (req, res) => {
    const saladId = req.params.id
    try {
        const showSalad = await Salad.query().findById(saladId)
        showSalad.user = await showSalad.$relatedQuery("user")
        const reviews = await showSalad.$relatedQuery("reviews").orderBy("createdAt", "desc")
        const reviewsWithUsers = await Promise.all(reviews.map(async(review) => {
            review.user = await review.$relatedQuery("user")
            return review
        }))
        showSalad.reviews = reviewsWithUsers
        
        return res.status(200).json({ salad: showSalad })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

saladsRouter.post("/vote", async (req, res) => {
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


export default saladsRouter;