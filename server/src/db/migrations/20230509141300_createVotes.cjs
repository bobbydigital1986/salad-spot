/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("votes", (table) => {
        table.bigIncrements("id")
        table.integer("vote")
            .notNullable()
        table.bigInteger("saladId")
            .index()
            .unsigned()
            .notNullable()
            .references("salads.id")
        table.bigInteger("userId")
            .index()
            .unsigned()
            .notNullable()
            .references("users.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
        table.unique(["saladId", "userId"])
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("votes")
}
