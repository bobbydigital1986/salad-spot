/* eslint-disable no-console */
import { connection } from "../boot.js"
import Salad from "../models/Salad.js"

class Seeder {
  static async seed() {
    const cobb = await Salad.query().insert({ name: "Cobb" })
    const fruit = await Salad.query().insert({ name: "Fruit" })
    const potato = await Salad.query().insert({ name: "Potato" })
    const quinoa = await Salad.query().insert({ name: "Quinoa" })
    const greek = await Salad.query().insert({ name: "Greek" })
    const caesar = await Salad.query().insert({ name: "Caesar" })
    const kale = await Salad.query().insert({ name: "Kale" })
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder