function toggleStatus(taskId) {
    let taskElement = document.getElementById(taskId);
    let statusElement = taskElement.querySelector('.status');

    if (statusElement.classList.contains('status-complete')) {
      statusElement.classList.remove('status-complete');
      statusElement.classList.add('status-incomplete');
      statusElement.textContent = 'Incomplete';
    } else {
      statusElement.classList.remove('status-incomplete');
      statusElement.classList.add('status-complete');
      statusElement.textContent = 'Complete';
    }
  }

  function addTask() {
    let newTaskTitle = document.getElementById('newTaskTitle').value.trim();

    if (newTaskTitle !== '') {
      let taskList = document.getElementById('taskList');

      let taskDiv = document.createElement('div');
      taskDiv.id = newTaskTitle;
      taskDiv.className = 'task';
      taskDiv.innerHTML = '<div class="title">' + newTaskTitle + '</div>' +
                          '<div class="status status-incomplete" onclick="toggleStatus(\'' + newTaskTitle + '\')">Incomplete</div>' +
                          '<button onclick="editTask(\'' + newTaskTitle + '\')">Edit</button>' +
                          '<button onclick="deleteTask(\'' + newTaskTitle + '\')">Delete</button>';

      taskList.appendChild(taskDiv);
      document.getElementById('newTaskTitle').value = ''; // Clear the input field after adding the task
    }
  }

  function editTask(taskId) {
    let taskElement = document.getElementById(taskId);
    let titleElement = taskElement.querySelector('.title');
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