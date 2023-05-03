import { Salad, User } from "../../models/index.js"

class SaladSeeder {
    static async seed() {
        const john = await User.query().findOne({ email: "johnDoe22@email.com" })
        const sally = await User.query().findOne({ email: "sallyseashell@email.com" })
        const mary = await User.query().findOne({ email: "Mary301@email.com" })
        const saladsData = [
            {
                name: "Cobb",
                userId: john.id
            },
            {
                name: "Fruit",
                userId: john.id
            },
            {
                name: "Potato",
                userId: mary.id
            },
            {
                name: "Quinoa",
                userId: mary.id
            },
            {
                name: "Greek",
                userId: mary.id
            },
            {
                name: "Caesar",
                userId: sally.id
            },
            {
                name: "Kale",
                userId: sally.id
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