const Model = require("./Model.js")

class Salad extends Model{
    static get tableName() {
        return "salads"
    }

    static get relationMappings() {
        const { User, Review } = require("./index.js")

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "salads.userId", 
                    to: "users.id"
                }
            },

            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: "salads.id",
                    to: "reviews.saladId"
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
                description: { type: "string" },
                imageUrl: { type: "string" } 
            }
        }
    }
}

module.exports = Salad

