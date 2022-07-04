const express = require("express");
const app = express();
const server = require("http").Server(app);

// TODO: This could be a database later, if needed.
const siteToPeers = new Map();

app.use(express.json());

app.get("/", function (request, response) {
    response.send("Hello, world!");
});
