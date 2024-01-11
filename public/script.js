document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('task-list');
  const addTaskForm = document.getElementById('add-task-form');

  // Function to fetch tasks from the server and update the UI
  function fetchTasks() {
      fetch('/tasks')
          .then(response => response.json())
          .then(data => {
              // Clear the existing tasks
              taskList.innerHTML = '';

              // Render the updated task list
              data.forEach(task => {
                  const taskElement = document.createElement('div');
                  taskElement.className = 'task';
                  taskElement.innerHTML = `<h3>${task.title}</h3><p>${task.description}</p>`;
                  taskList.appendChild(taskElement);
              });
          })
          .catch(error => console.error('Error fetching tasks:', error));
  }

  // Fetch tasks when the page loads
  fetchTasks();

  // Event listener for form submission
  addTaskForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const taskTitle = document.getElementById('task-title').value;
      const taskDescription = document.getElementById('task-description').value;

      // Create a new task object
      const newTask = {
          title: taskTitle,
          description: taskDescription,
      };

      // Send a POST request to add the task
      fetch('/tasks', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
      })
          .then(response => response.json())
          .then(data => {
              // Fetch updated tasks and update the UI
              fetchTasks();
          })
          .catch(error => console.error('Error adding task:', error));

      // Clear the form inputs
      addTaskForm.reset();
  });
});
