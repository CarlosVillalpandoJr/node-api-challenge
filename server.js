const express = require('express');
const server = express();

const ProjectRouter = require('./routes/projectRouter');
const ActionRouter = require('./routes/actionRouter');

server.use(express.json());
server.use('/projects', ProjectRouter);
server.use('/actions', ActionRouter);

server.get('/', (req, res) => {
    res.send(`<h2>API Challenge</h2>`)
})

module.exports = server;