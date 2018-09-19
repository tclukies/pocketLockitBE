exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("person")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("person").insert([
                {
                    id: 1,
                    first_name: "Tom",
                    last_name: "Clukies",
                    email: "thomas.clukies@gmail.com",
                    username: "tclukies",
                    password: "password123"
                }
            ]);
        })
        .then(() => {
            return knex.raw("ALTER SEQUENCE person_id_seq RESTART WITH 2;");
        });
};
