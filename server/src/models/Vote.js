const Model = require("./Model")

class Vote extends Model {
    static get tableName() {
        return "votes"
    }

    static relationMappings() {
        const { User, Salad } = require("./index.js")

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "votes.userId",
                    to: "users.id"
                }
            },
            salad: {
                relation: Model.BelongsToOneRelation,
                modelClass: Salad,
                join: {
                    from: "votes.saladId",
                    to: "salads.id"
                }
            }
        }
    }
}

module.exports = Vote