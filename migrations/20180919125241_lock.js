exports.up = function(knex, Promise) {
    return knex.schema.createTable("lock", table => {
        table.increments("id");
        table
            .integer("user_id")
            .references("person.id")
            .unsigned()
            .onDelete("cascade");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("lock");
};
