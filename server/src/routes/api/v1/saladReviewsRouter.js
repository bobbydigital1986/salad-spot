import express from 'express'
import objection from 'objection'
const{ ValidationError } = objection
import { Review } from '../../../models/index.js'

const saladReviewsRouter = new express.Router({ mergeParams: true })

saladReviewsRouter.post('/', async (req, res) => {
    const { body } = req
    const saladIdParams = req.params.id
    const reviewerId = req.user.id
    const formDataWithId = { ...body, saladId: saladIdParams, userId: reviewerId }

    try {
        const newReview = await Review.query().insertAndFetch(formDataWithId)
        return res.status(201).json({ body: newReview })
    } catch(error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default saladReviewsRouter
