import express from "express"

import { User } from "../../../models/index.js"

const userActivityRouter = new express.Router({ mergeParams: true })

userActivityRouter.get("/", async (req, res) => {
    const userData = req.user

    try {
        const user = await User.query().findById(userData.id)
        user.salads = await user.$relatedQuery("salads")
        user.reviews = await user.$relatedQuery("reviews")
        const userSaladsSorted = user.salads.sort((b,a) => {
            return Date.parse(a.createdAt) - Date.parse(b.createdAt)
        })
        const sortedSaladsWithUser = await Promise.all(userSaladsSorted.map(async(salad) => {
            salad.user = await salad.$relatedQuery("user")
            return salad
        }))
        user.salads = sortedSaladsWithUser
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default userActivityRouter