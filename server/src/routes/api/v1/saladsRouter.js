import express from "express"
// import saladReviewsRouter from "./saladReviewsRouter.js"
import objection from "objection"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { User, Salad } from "../../../models/index.js"

const saladsRouter = new express.Router()

saladsRouter.get("/", async (req, res) => {
    try {
        const saladsSansUsers = await Salad.query()
        const salads = await Promise.all(saladsSansUsers.map( async (salad) => {
            const saladUser = await salad.$relatedQuery("user")
            salad.user = saladUser.username
            return salad
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
        const newSalad = await postingUser.$relatedQuery("salads").insertAndFetch(cleanSalad)

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
        showSalad.reviews = await showSalad.$relatedQuery("reviews")
        return res.status(200).json({ salad: showSalad })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

// saladsRouter.use('/:id/reviews', saladReviewsRouter)

export default saladsRouter;