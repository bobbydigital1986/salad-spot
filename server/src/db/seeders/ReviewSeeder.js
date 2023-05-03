import { Review, Salad } from "../../models/index.js"

class ReviewSeeder {
    static async seed() {
        const cobb = await Salad.query().findOne({ name: "Cobb" })
        const fruit = await Salad.query().findOne({ name: "Fruit" })

        const john = await User.query().findOne({ email: "johnDoe22@email.com" })
        const sally = await User.query().findOne({ email: "sallyseashell@email.com" })
        const mary = await User.query().findOne({ email: "Mary301@email.com" })

        const reviewsData = [
            {
                user: "John",
                body: "Not enough fruit in this salad",
                saladId: cobb.id,
                userId: john.id
            },
            {
                user: "Sally",
                body: "Needs more hot sauce",
                saladId: fruit.id,
                userId: sally.id
            },
            {
                user: "Mary",
                body: "This looks like a bird nest",
                saladId: fruit.id,
                userId: mary.id
            }
        ]
        for (const singleReviewData of reviewsData) {
            const currentReview = await Review.query().findOne(singleReviewData)
            if (!currentReview) {
                await Review.query().insert(singleReviewData)
            }
        }
    }
}

export default ReviewSeeder