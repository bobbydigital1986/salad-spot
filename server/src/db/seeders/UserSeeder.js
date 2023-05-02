import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const usersData = [
            {
                email: "johnDoe22@email.com",
                cryptedPassword: "12345"
            },
            { 
                email: "sallyseashell@email.com", 
                cryptedPassword: "54321" 
            },
            { 
                email: "Mary301@email.com", 
                cryptedPassword: "24689" 
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

