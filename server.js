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

server.get('/api/projects/actions/:project_id', (req, res) => {
  const { project_id } = req.params;
  projects.getProjectActions(project_id)
    .then(response => {
      if (response.length < 1) {
        res.status(404).json({ message: "There are no actions for that project." })
      } else {
        res.json(response)
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The project/action information could not be retrieved." })
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

server.get('/api/actions', (req, res) => {
  actions.get()
    .then(response => {
      res.json(response)
    })
    .catch(() => {
      res.status(500).json({ error: "The action information could not be retrieved."})
    })
});

server.get('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  actions.get(id)
    .then(response => {
      if (response.length < 1) {
        res.status(404).json({ message: "The action with the specified ID does not exist." })
      } else {
        res.json(response)
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The action information could not be retrieved." })
    })
});

server.post('/api/actions', (req, res) => {
  const { project_id, description, notes } = req.body;
  actions.insert({ project_id, description, notes })
      .then(response => {
        res.status(201).json(response)
      })
      .catch(() => {
        res.status(500).json({ error: "There was an error while saving the action to the database." })
      })
});

server.put('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes } = req.body;
  actions.get(id)
    .then(response => {
      if (response.length < 1) {
        res.status(404).json({ message: "The action with the specified ID does not exist."})
      } else {
        actions.update(id, { project_id, description, notes })
          .then((change) => {
            res.status(200).json(change);
          })
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The action information could not be modified."})
    })
});

server.delete('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  actions.remove(id)
    .then(response => {
      if (response > 0) {
        res.status(200).json(response)
      } else {
        res.status(404).json({ message: "The action with the specified ID does not exist." })
      }
    })
    .catch(() => {
      res.status(500).json({ error: "The action could not be removed."})
    })
});


server.listen(5001, () => console.log('\n === API running on port 5001 === \n'));