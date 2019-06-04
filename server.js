// bring in express
const express = require('express');

// create express server
const server = express();

// require router
const ContentRouter = require('./data/content-router');

// body parser middleware
server.use(express.json());

server.use('/api/posts', ContentRouter)

server.get('/', (req, res) => {
    res.send('<h2>Check to see this works</h2>')
});

// export so index.js can require server
module.exports = server;