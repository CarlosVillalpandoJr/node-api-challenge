const express = require('express');
const server = express();

const Projects = require('./data/helpers/projectModel');
const Actions = require('./data/helpers/actionModel');

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h2>API Challenge</h2>`)
})

module.exports = server;