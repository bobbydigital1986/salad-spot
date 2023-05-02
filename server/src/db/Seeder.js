/* eslint-disable no-console */
import { connection } from "../boot.js"
import Salad from "../models/Salad.js"
import usersRouter from "../routes/api/v1/usersRouter.js"
import User from "../models/User.js"

class Seeder {
  static async seed() {
    const john = await User.query().insert({ email: "johnDoe22@email.com", cryptedPassword: "12345" })
    const sally = await User.query().insert({ email: "sallyseashell@email.com", cryptedPassword: "54321" })
    const mary = await User.query().insert({ email: "Mary301@email.com", cryptedPassword: "24689" })

    const cobb = await Salad.query().insert({ name: "Cobb", userId: john.id })
    const fruit = await Salad.query().insert({ name: "Fruit", userId: john.id })
    const potato = await Salad.query().insert({ name: "Potato", userId: mary.id })
    const quinoa = await Salad.query().insert({ name: "Quinoa", userId: mary.id })
    const greek = await Salad.query().insert({ name: "Greek", userId: mary.id })
    const caesar = await Salad.query().insert({ name: "Caesar", userId: sally.id })
    const kale = await Salad.query().insert({ name: "Kale", userId: sally.id })
    

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder