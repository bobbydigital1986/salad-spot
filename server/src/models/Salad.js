const Model = require("./Model.js")

class Salad extends Model{
    static get tableName() {
        return "salads"
    }

    static get relationMappings() {
        const { User } = require("./index.js")

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "salads.userId", 
                    to: "users.id"
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" },
                description: { type: "string" }
            }
        }
    }
}

module.exports = Salad

