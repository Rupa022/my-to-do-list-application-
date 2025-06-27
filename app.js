document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            createTaskElement(taskText, false); // Create task element, not completed
            saveTasks(); // Save tasks to local storage
            taskInput.value = ''; // Clear the input field
        } else {
            alert('Please enter a task!');
        }
    }

    // Function to create and append a task element to the list
    function createTaskElement(text, isCompleted) {
        const listItem = document.createElement('li');
        if (isCompleted) {
            listItem.classList.add('completed');
        }

        const taskTextSpan = document.createElement('span');
        taskTextSpan.classList.add('task-text');
        taskTextSpan.textContent = text;
        taskTextSpan.addEventListener('click', () => {
            listItem.classList.toggle('completed'); // Toggle 'completed' class
            saveTasks(); // Save changes
        });

        const taskButtonsDiv = document.createElement('div');
        taskButtonsDiv.classList.add('task-buttons');

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(listItem); // Remove the task from the DOM
            saveTasks(); // Save changes
        });

        taskButtonsDiv.appendChild(deleteBtn);
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(taskButtonsDiv);
        taskList.appendChild(listItem);
    }

    // Function to save current tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(item => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }
});