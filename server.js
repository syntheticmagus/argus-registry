const express = require("express");
const app = express();

// TODO: This could be a database later, if needed.
const siteToPeers = new Map();

app.get("/", function (request, response) {
    response.send("Successful response.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port ${port}.`) });
