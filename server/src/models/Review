const Model = require("./Model.js")

class Review extends Model {
    static get tableName() {
        return "reviews"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["review", 'name'],
            properties: {
                name: { type: "string" },
                review: { type: "string" }
            }
        }
    }
}

module.exports = Review