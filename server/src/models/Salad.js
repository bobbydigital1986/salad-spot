const Model = require("./Model.js")


class Salad extends Model{
    static get tableName() {
        return "salads"
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ["name"],
            properties: {
                name: {type: "string"},
                description: {type: "string"}
            }

        }

    }
}

module.exports = Salad

