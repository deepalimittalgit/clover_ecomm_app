const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const server = express();

// GCP App Engine only supports 8080
const port = 8080;

const routes = require("./cloverRouter");

/* parse application/json*/
server.use(bodyParser.json());

/* parse application/x-www-form-urlencoded*/
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(router);
server.use(express.static(path.join(__dirname, "/build")));

server.use('/api', routes);

server.get('/index', (req, res) => res.sendFile(path.join(__dirname, '/build/index.html')));

server.listen(port, () => console.log(`Server is running on port ${port}`));