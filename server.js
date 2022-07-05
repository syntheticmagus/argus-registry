const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// TODO: This could be a database later, if needed.
const siteToPeerIdToTimes = new Map();

app.get("/", function (request, response) {
    response.redirect("/status");
});

app.get("/status", function (request, response) {
    response.send(`Service live. Active sites: ${siteToPeerIdToTimes.size}`);
});

app.get("/debug", function (request, response) {
    const obj = {};
    siteToPeerIdToTimes.forEach((peerIdToTime, site) => {
        obj[site] = [];
        peerIdToTime.forEach((time, peerId) => {
            obj[site].push(peerId);
        });
    });
    response.send(JSON.stringify(obj));
});

app.post("/sensor", function (request, response) {
    const site = request.body.site;
    const peerId = request.body.peerId;

    if (!siteToPeerIdToTimes.has(site)) {
        siteToPeerIdToTimes.set(site, new Map());
    }

    const peerIdToTime = siteToPeerIdToTimes.get(site);
    peerIdToTime.set(peerId, Date.now());

    response.status(200).send();
});

app.post("/viewer", function (request, response) {
    const site = request.body.site;
    const current = [];

    if (siteToPeerIdToTimes.has(site)) {
        const now = Date.now();
        const peerIdToTime = siteToPeerIdToTimes.get(site);
        const outdated = [];
        peerIdToTime.forEach((time, peerId) => {
            if (now - time < 120 * 1000) {
                current.push(peerId);
            } else {
                outdated.push(peerId);
            }
        });
    
        outdated.forEach((peerId) => {
            peerIdToTime.delete(peerId);
        });
    }

    response.status(200).send(JSON.stringify({ peerIds: current }));
});

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port ${port}.`) });
