import { User, Salad, Vote } from "../../models/index.js";

class VoteSeeder {
    static async seed() {
        const salads = await Salad.query()
        const users = await User.query()
        for (const user of users) {
            for (const salad of salads) {
                    await Vote.query().insert({ vote: 1, userId: user.id, saladId: salad.id})
            }
        }
    }
}

export default VoteSeeder