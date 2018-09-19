const database = require("./database-connection");

module.exports = {
    listProfs() {
        return database("person").select("*");
    },
    listLocks() {
        return database("lock").select("*");
    },
    listLogs(){
        return database("lock_log").select("*");
    },
    readLogsByLock_id(id) {
        return database("lock_log").select()
        .where("lock_id", id)
    },
    createLogs(log) {
        return database("lock_log")
            .insert(log)
            .returning("*")
            .then(record => record[0]);
    },
};
