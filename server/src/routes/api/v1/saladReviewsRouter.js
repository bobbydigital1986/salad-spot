import express from 'express'
import objection from 'objection'
const{ ValidationError } = objection
import { Review } from '../../../models/index.js'
import cleanUserInput from '../../../services/cleanUserInput.js'

const saladReviewsRouter = new express.Router({ mergeParams: true })

saladReviewsRouter.post('/', async (req, res) => {
    const bodyRaw = req.body
    const body = cleanUserInput(bodyRaw)
    const saladIdParams = req.params.id
    const reviewer = req.user
    const formDataWithId = { ...body, saladId: saladIdParams, userId: reviewer.id }

    try {
        const newReview = await Review.query().insertAndFetch(formDataWithId)
        newReview.user = reviewer
        return res.status(201).json({ body: newReview })
    } catch(error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error })
        }
        return res.status(500).json({ errors: error })
    }
})

export default saladReviewsRouter
