const express = require('express');
const server = express();

const projects = require('./data/helpers/projectModel');
const actions = require('./data/helpers/actionModel');

server.use(express.json());

// ============================= ProjectModel endpoints ===================================

server.get('/api/projects', (req, res) => {
  projects.get()
    .then(response => {
      res.json(response)
    })
    .catch(() => {
      res.status(500).json({ error: "The projects information could not be retrieved."})
    })
});


server.listen(5001, () => console.log('\n === API running on port 5001 === \n'));