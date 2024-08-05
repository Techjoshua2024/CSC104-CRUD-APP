document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    function renderTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${task}
                <span>
                    <button class="btn btn-sm btn-warning" onclick="editTask(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
                </span>
            `;
            taskList.appendChild(li);
        });
    }

    function showPopup(message) {
        const popup = document.createElement('div');
        popup.className = 'popup-message';
        popup.textContent = message;
        document.body.appendChild(popup);

        setTimeout(() => {
            document.body.removeChild(popup);
        }, 5000);
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = taskInput.value.trim();
        if (task) {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(tasks);

            taskInput.value = '';
        }
    });

    window.editTask = function(index) {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        const newTask = prompt('Edit the task', tasks[index]);
        if (newTask) {
            tasks[index] = newTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(tasks);
        }
    };

    window.deleteTask = function(index) {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        const deletedTask = tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(tasks);

        showPopup('TODO-LIST deleted');
    };

    // Initialize tasks on page load
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks(tasks);
});
