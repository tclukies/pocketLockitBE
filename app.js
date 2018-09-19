const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = parseInt(process.env.PORT || 3000);
const queries = require("./queries.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));



app.get("/profiles", (request, response, next) => {
    queries
        .listProfs()
        .then(profile => {
            response.json({ profile });
        })
        .catch(next);
});

app.get("/locks", (request, response, next) => {
    queries
        .listLocks()
        .then(lock => {
            response.json({ lock });
        })
        .catch(next);
});

app.get("/log/lock/:id", (request, response, next) => {
    queries
        .readLogsByLock_id(request.params.id)
        .then(logs => {
            logs
                ? response.json({ logs })
                : response.status(404).json({ message: "Not found" });
        })
        .catch(next);
});

app.get("/lock_log", (request, response, next) => {
    queries
        .listLogs()
        .then(log => {
            response.json({ log });
        })
        .catch(next);
});

app.post("/lock_log", (request, response, next) => {
    queries
        .createLogs(request.body)
        .then(logs => {
            response.status(201).json({ logs: logs });
        })
        .catch(next);
});



app.use(notFound);
app.use(errorHandler);


function notFound(req, res, next) {
    const url = req.originalUrl;
    if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
        console.error("[404: Requested file not found] ", url);
    }
    res.status(404).send({ error: "Url not found", status: 404, url });
}

function errorHandler(err, req, res, next) {
    console.error("ERROR", err);
    const stack = process.env.NODE_ENV !== "production" ? err.stack : undefined;
    res.status(500).send({ error: err.message, stack, url: req.originalUrl });
}

app.listen(port)
    .on("error", console.error.bind(console))
    .on("listening", console.log.bind(console, "Listening on " + port));
