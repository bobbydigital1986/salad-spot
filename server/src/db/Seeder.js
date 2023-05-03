/* eslint-disable no-console */
import { connection } from "../boot.js"
import Salad from "../models/Salad.js"
import usersRouter from "../routes/api/v1/usersRouter.js"
import User from "../models/User.js"
import UserSeeder from "./seeders/UserSeeder.js"
import SaladSeeder from "./seeders/SaladSeeder.js"
import ReviewSeeder from "./seeders/ReviewSeeder.js"

class Seeder {
  static async seed() {
    console.log('seeding users...')
    await UserSeeder.seed()

    console.log('seeding salads...')
    await SaladSeeder.seed()

    console.log("review this!")
    await ReviewSeeder.seed
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder