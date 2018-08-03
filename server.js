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
      res.status(500).json({ error: "The project information could not be retrieved."})
    })
});

server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projects.get(id)
    .then(response => {
      if (response.length < 1) {
        res.status(404).json({ message: "The project with the specified ID does not exist." })
      } else {
        res.json(response)
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The project information could not be retrieved." })
    })
});

server.post('/api/projects', (req, res) => {
  const { name, description } = req.body;
  projects.insert({ name, description })
      .then(response => {
        res.status(201).json(response)
      })
      .catch(() => {
        res.status(500).json({ error: "There was an error while saving the project to the database." })
      })
});

server.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  projects.get(id)
    .then(response => {
      if (response.length < 1) {
        res.status(404).json({ message: "The user with the specified ID does not exist."})
      } else {
        projects.update(id, { name, description })
          .then((change) => {
            res.status(200).json(change);
          })
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The user information could not be modified."})
    })
});

server.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projects.remove(id)
    .then(response => {
      if (response > 0) {
        res.status(200).json(response)
      } else {
        res.status(404).json({ message: "The project with the specified ID does not exist." })
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The project could not be removed."})
    })
});

// ============================= ActionModel endpoints ===================================




server.listen(5001, () => console.log('\n === API running on port 5001 === \n'));