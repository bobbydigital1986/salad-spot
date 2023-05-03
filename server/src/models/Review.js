const Model = require("./Model.js")

class Review extends Model {
    static get tableName() {
        return "reviews"
    }

    static get relationMappings() {
        const { Salad, User } = require("./index.js")

        return {
            salad: {
                relation: Model.BelongsToOneRelation,
                modelClass: Salad,
                join: {
                    from: "reviews.saladId",
                    to: "salads.id"
                }
            },

            user: {
                relation: Model.HasManyRelation,
                modelClass : User,
                join: {
                    from: "reviews.userId",
                    to: "users.id"
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["user", 'body'],
            properties: {
                user: { type: "string" },
                body: { type: "string" }
            }
        }
    }
}

module.exports = Review