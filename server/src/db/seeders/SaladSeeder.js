import { Salad, User } from "../../models/index.js"

class SaladSeeder {
    static async seed() {
        const john = await User.query().findOne({ email: "johnDoe22@email.com" })
        const sally = await User.query().findOne({ email: "sallyseashell@email.com" })
        const mary = await User.query().findOne({ email: "Mary301@email.com" })
        const saladsData = [
            {
                name: "Cobb",
                description: "A classic American salad made with chopped lettuce, tomato, avocado, chicken, bacon, hard-boiled eggs, and blue cheese. Served with a vinaigrette dressing.",
                userId: john.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/cobb.jpg" 
            },
            {
                name: "Fruit",
                description: "A refreshing salad made with a variety of fresh fruits such as strawberries, blueberries, pineapple, and melon. Often served with a sweet and tangy dressing.",
                userId: john.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/fruit.jpg" 
            },
            {
                name: "Potato",
                description: "A cold salad made with boiled potatoes, diced vegetables (such as celery and onion), and mayonnaise. Often seasoned with salt, pepper, and herbs.",
                userId: mary.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/potato.jpg"
            },
            {
                name: "Quinoa",
                description: "A nutritious salad made with cooked quinoa, diced vegetables (such as cucumber and bell pepper), and a vinaigrette dressing. Often topped with nuts or seeds for added texture.",
                userId: mary.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/quinoa.jpg"
            },
            {
                name: "Greek",
                description: "A Mediterranean-style salad made with chopped lettuce, tomato, cucumber, olives, and feta cheese. Served with a lemon-oregano dressing.",
                userId: mary.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/greek.jpg"
            },
            {
                name: "Caesar",
                description: "A classic salad made with romaine lettuce, croutons, parmesan cheese, and a creamy dressing (typically made with anchovies, garlic, and lemon juice).",
                userId: sally.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/caesar.jpg"
            },
            {
                name: "Kale",
                description: "A healthy salad made with nutrient-rich kale, avocado, nuts, and other vegetables. Often served with a vinaigrette dressing or a tahini-based dressing.",
                userId: sally.id,
                imageURL: "https://salad-theory.s3.amazonaws.com/kale.jpg"
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