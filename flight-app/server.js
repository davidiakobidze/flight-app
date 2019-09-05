const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

let flights = [{
    "from": "Tbilisi",
    "to": "London",
    "departureTime": "12:00",
    "landingTime": "14:00",
    "price": "200$"
}, {
    "from": "Paris",
    "to": "Milan",
    "departureTime": "12:45",
    "landingTime": "14:00",
    "price": "100$"
}, {
    "from": "New York",
    "to": "Madrid",
    "departureTime": "21:00",
    "landingTime": "00:00",
    "price": "400$"
}, {
    "from": "Los Angeles",
    "to": "Tokyo",
    "departureTime": "08:30",
    "landingTime": "13:45",
    "price": "500$"
}, {
    "from": "San Diego",
    "to": "Toronto",
    "departureTime": "19:45",
    "landingTime": "21:10",
    "price": "200$"
},
];

app.post("/api/auth", (req, res) => {
    if (req.body["username"] === "admin" && req.body["password"] === "admin") {
        res.send(200);
    } else {
        res.send(401);
    }
});

app.delete("/api/delete", (req, res) => {
    let index = req.body["index"];
    flights.splice(index, 1);
    res.send(flights);
});

app.post("/api/add", (req, res) => {
    flights.push(req.body);
    res.send(flights);
});

app.get('/api/flights', (req, res) => {
    res.send({flights: flights});
});

app.listen(port, () => console.log(`Listening on port ${port}`));