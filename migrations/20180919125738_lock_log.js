exports.up = function(knex, Promise) {
    return knex.schema.createTable("lock_log", table => {
        table.increments("id");
        table
            .integer("lock_id")
            .references("lock.id")
            .unsigned()
            .onDelete("cascade");
        table.text("status")
        table.timestamp('status_changed').defaultTo(knex.fn.now())
        table.text("location")
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("lock_log");
};
