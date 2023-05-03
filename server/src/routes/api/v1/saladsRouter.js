import express from "express"
import objection from "objection"
import saladReviewsRouter from "./saladReviewsRouter.js"

import { Salad } from "../../../models/index.js"

const saladsRouter = new express.Router()

saladsRouter.get("/", async (req, res) => {
    try {
        const salads = await Salad.query()
        return res.status(200).json({ salads: salads })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

saladsRouter.get("/:id", async (req, res) => {
    const saladId = req.params.id
    
    try {
        const showSalad = await Salad.query().findById(saladId)
        return res.status(200).json({ salad: showSalad })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

saladsRouter.use('/:saladId/reviews', saladReviewsRouter)

export default saladsRouter;