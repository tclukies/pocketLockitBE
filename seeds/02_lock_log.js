exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("lock_log")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("lock_log").insert([
                { id: 1, lock_id: 1, status: "locked", status_changed: "2018-09-20T00:00:29.080Z", location: "0, 0"}
            ]);
        })
        .then(() => {
            return knex.raw("ALTER SEQUENCE lock_log_id_seq RESTART WITH 2;");
        });
};
