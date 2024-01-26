const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const completedTaskList = document.getElementById('completed-task-list');

function addTask() {
  const taskText = newTaskInput.value;
  if (taskText) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task';
    taskItem.innerHTML = `<label><input type="checkbox"><span>${taskText}</span></label><button>Delete</button>`;
    taskList.appendChild(taskItem);
    newTaskInput.value = '';
    taskItem.querySelector('button').addEventListener('click', function() {
      taskList.removeChild(taskItem);
    });
    taskItem.querySelector('input[type="checkbox"]').addEventListener('change', function() {
      if (this.checked) {
        taskItem.classList.add('completed');
        this.nextElementSibling.textContent = 'completed';
        this.nextElementSibling.style.color = 'green';
        completedTaskList.appendChild(taskItem);
      } else {
        taskItem.classList.remove('completed');
        this.nextElementSibling.textContent = '';
        this.nextElementSibling.style.color = 'black';
        taskList.appendChild(taskItem);
      }

      if (taskItem.classList.contains('completed')) {
        setTimeout(function() {
          taskList.removeChild(taskItem);
        }, 1000);
      }
    });
  } else {
    alert('Please enter a task!');
  }
}

addTaskButton.addEventListener('click', addTask);

newTaskInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

taskList.addEventListener('change', function(event) {
  if (event.target.type === 'checkbox') {
    const taskItem = event.target.closest('.task');
    taskItem.classList.toggle('completed', event.target.checked);
    const taskText = taskItem.querySelector('span');
    if (event.target.checked) {
      taskText.style.color = 'green';
      taskText.textContent = ' (completed)';
      completedTaskList.appendChild(taskItem);
    } else {
      taskText.style.color = 'black';
      taskText.textContent = taskText.textContent.replace(' (completed)', '');
      taskList.appendChild(taskItem);
    }
  }
});
