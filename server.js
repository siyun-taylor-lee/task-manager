const express = require('express');
const path  = require('path')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// In-memory data store for tasks
let tasks = [];

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname,'public')));

// Route to get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Route to add a new task
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Route to update a task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;

  tasks = tasks.map(task => {
    if (task.id === taskId) {
      return { ...task, ...updatedTask, id: taskId };
    }
    return task;
  });

  res.json(updatedTask);
});

// Route to delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);

  res.json({ message: 'Task deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
