exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("lock")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("lock").insert([{ id: 1, user_id: 1 }]);
        })
        .then(() => {
            return knex.raw("ALTER SEQUENCE lock_id_seq RESTART WITH 2;");
        });
};
