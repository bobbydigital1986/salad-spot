import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const usersData = [
            {
                username: "JohnDoe22",
                email: "johnDoe22@email.com",
                password: "12345"
            },
            { 
                username: "SallySeashell",
                email: "sallyseashell@email.com", 
                password: "54321" 
            },
            { 
                username: "Mary301",
                email: "Mary301@email.com", 
                password: "24689" 
            }
        ]
        for (const singleUserData of usersData) {
            const currentUser = await User.query().findOne(singleUserData)
            if (!currentUser) {
                await User.query().insert(singleUserData)
            }
        }
    }
}

export default UserSeeder

