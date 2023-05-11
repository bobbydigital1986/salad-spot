import { User, Salad, Vote } from "../../models/index.js";

class VoteSeeder {
    static async seed() {
        const firstSalad = await Salad.query().first()
        const firstUser = await User.query().first()
        
        await Vote.query().insert({ vote: 1, userId: firstUser.id, saladId: firstSalad.id})
    }
}

export default VoteSeeder