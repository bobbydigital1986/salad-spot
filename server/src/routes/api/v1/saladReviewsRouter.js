import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Review } from "../../../models/index.js"

const saladReviewsRouter = new express.Router({ mergeParams: true })

saladReviewsRouter.get("/", async (req, res) =>{
    const reviewId = req.params.saladId

    try{
        const reviews = await Review.query()
        return res.status(200).json({ reviews: reviews })
    } catch(error){
        return res.status(500).json({ errors: error })
    }
})

saladReviewsRouter.get("/:id", async (req, res) => {
    const reviewId = req.params.saladId

    try {
        const showReview = await Review.query().findById(reviewId)
        return res.status(200).json({ review: showReview })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

saladReviewsRouter.post("/", async (req, res) => {
    const { body } = req
    const saladIdParams = req.params.saladIdParams
    const formDataWithId = {...body, saladId: saladIdParams}
    try {
        const newReview = await Review.query().insertAndFetch(formDataWithId)
        return res.status(201).json({ body:newReview })
    }catch(error) {
        if(error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error })
    }
})

export default saladReviewsRouter