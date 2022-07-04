const express = require("express");
const app = express();
const server = require("https").Server(app);

// TODO: This could be a database later, if needed.
const siteToPeers = new Map();

app.use(express.json());

app.get("/", function (request, response) {
    response.status(404).send("Home page unavailable.");
});

server.listen(process.env.PORT || 3000);
