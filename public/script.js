const triggerTabList = document.querySelectorAll('#navTab')
triggerTabList.forEach(triggerEl => {
  const tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', event => {
    event.preventDefault()
    tabTrigger.show()
  })
})
function moveTab() {
    document.querySelector('#navTab a').click();
};

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
                  const taskElement = document.createElement('li');
                  taskElement.className = 'list-group-item';
                  taskElement.innerHTML = '<div class="task-title">' + newTaskTitle + '</div>' +
                  '<div class="task-description">' + newTaskDescription + '</div>' +
                  '<div class="status status-incomplete">' +
                  '<button class="btn btn-primary btn-sm text-bg-secondary" onclick="toggleStatus(\'' + newTaskTitle + '\')">Incomplete</button>' +
                  '<button class="btn btn-primary btn-sm text-bg-info" onclick="editTask(\'' + newTaskTitle + '\')">Edit</button>' +
                  '<button class="btn btn-primary btn-sm text-bg-danger" onclick="deleteTask(\'' + newTaskTitle + '\')">Delete</button>' +
                  '</div>';
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
          title: newTaskTitle,
          description: newTaskDescription,
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

function toggleStatus(taskId) {
    let taskElement = document.getElementById(taskId);
    let statusElement = taskElement.querySelector('.status');
    let buttonElement = statusElement.querySelector('.btn');

    if (statusElement.classList.contains('status-complete')) {
      statusElement.classList.remove('status-complete');
      statusElement.classList.add('status-incomplete');
      buttonElement.classList.remove('text-bg-success');
      buttonElement.classList.add('text-bg-secondary');
      buttonElement.textContent = 'Incomplete';
    } else {
      statusElement.classList.remove('status-incomplete');
      statusElement.classList.add('status-complete');
      buttonElement.classList.remove('text-bg-secondary');
      buttonElement.classList.add('text-bg-success');
      buttonElement.textContent = 'Complete';
    }
  }

  function addTask() {
    let newTaskTitle = document.getElementById('newTaskTitle').value.trim();
    let newTaskDescription = document.getElementById('newTaskDescription').value.trim();

    if (newTaskTitle !== '') {
      let taskList = document.querySelector('.list-group'); // <ul class="list-group">
      let taskListItem = document.createElement('li'); //<li class="list-group-item" id="task1">
      taskListItem.id = newTaskTitle;
      taskListItem.className = 'list-group-item';
      taskListItem.innerHTML = '<div class="task-title">' + newTaskTitle + '</div>' +
                                '<div class="task-description">' + newTaskDescription + '</div>' +
                                '<div class="status status-incomplete">' +
                                '<button class="btn btn-primary btn-sm text-bg-secondary" onclick="toggleStatus(\'' + newTaskTitle + '\')">Incomplete</button>' +
                                '<button class="btn btn-primary btn-sm text-bg-info" onclick="editTask(\'' + newTaskTitle + '\')">Edit</button>' +
                                '<button class="btn btn-primary btn-sm text-bg-danger" onclick="deleteTask(\'' + newTaskTitle + '\')">Delete</button>' +
                                '</div>';

      taskList.appendChild(taskListItem);
      document.getElementById('newTaskTitle').value = ''; // Clear the input field after adding the task
      document.getElementById('newTaskDescription').value = ''; // Clear the input field after adding the task
    }
  }

  function editTask(taskId) {
    let taskElement = document.getElementById(taskId);
    let titleElement = taskElement.querySelector('.task-title');
    let newTitle = prompt('Edit task title:', titleElement.textContent);

    if (newTitle !== null && newTitle.trim() !== '') {
      titleElement.textContent = newTitle.trim();
      taskElement.id = newTitle.trim(); // Update the task ID
    }
  }

  function deleteTask(taskId) {
    let taskElement = document.getElementById(taskId);
    if (confirm('Are you sure you want to delete this task?')) {
      taskElement.remove();
    }
  }