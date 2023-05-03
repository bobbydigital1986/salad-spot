import express from "express"
import objection from "objection"
import { ValidationError } from "objection"

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

saladsRouter.post("/new", async (req, res)=> {
    try {
        const salads = await Salad.query()
        return res.status(201).json({ salads: salads }) 
    } catch(error) {
        console.log(error)
        if (error instanceof ValidationError) {
            res.status(422).json({ errors: error.data })
        } else {
        return res.status(500).json({ errors: error })
        }
    }
})

export default saladsRouter;