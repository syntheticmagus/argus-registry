const express = require("express");
const app = express();
const server = require("https").Server(app);

// TODO: This could be a database later, if needed.
const siteToPeers = new Map();

app.use(express.json());

console.log("Hello, world!");

app.get("/", function (request, response) {
    console.log("Home page requested...");
    response.status(404).send("Home page unavailable.");
});
