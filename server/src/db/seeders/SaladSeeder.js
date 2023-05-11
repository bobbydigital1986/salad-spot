import { Salad, User } from "../../models/index.js"

class SaladSeeder {
    static async seed() {
        const john = await User.query().findOne({ email: "johnDoe22@email.com" })
        const sally = await User.query().findOne({ email: "sallyseashell@email.com" })
        const mary = await User.query().findOne({ email: "Mary301@email.com" })
        const saladsData = [
            {
                name: "Cobb",
                description: "This was a super tasty salad",
                userId: john.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/cobb.jpg" 
            },
            {
                name: "Fruit",
                description: "This was a super tasty salad",
                userId: john.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/fruit.jpg" 
            },
            {
                name: "Potato",
                description: "This was a super tasty salad",
                userId: mary.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/potato.jpg"
            },
            {
                name: "Quinoa",
                description: "This was a super tasty salad",
                userId: mary.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/quinoa.jpg"
            },
            {
                name: "Greek",
                description: "This was a super tasty salad",
                userId: mary.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/greek.jpg"
            },
            {
                name: "Caesar",
                description: "This was a super tasty salad",
                userId: sally.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/caesar.jpg"
            },
            {
                name: "Kale",
                description: "This was a super tasty salad",
                userId: sally.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/Kale.jpg"
            }
        ]
        for (const singleSaladData of saladsData) {
            const currentSalad = await Salad.query().findOne(singleSaladData)
            if (!currentSalad) {
                await Salad.query().insert(singleSaladData)
            }
        }
    }
}

export default SaladSeeder