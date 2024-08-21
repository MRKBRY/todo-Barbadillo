let currentEditTask = null;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        Swal.fire('Error', 'Please enter a task!', 'error');
        return;
    }

    const taskList = document.getElementById('taskList');
    
    // If editing an existing task
    if (currentEditTask) {
        const textNode = currentEditTask.querySelector('.task-text');
        textNode.textContent = taskText;
        taskInput.value = '';
        currentEditTask = null;
        const addButton = document.getElementById('addTaskBtn');
        addButton.textContent = 'Add Task';
        addButton.classList.remove('edit');
        return;
    }

    // Create a new list item
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    // Create a text node for the task
    const textNode = document.createElement('span');
    textNode.className = 'task-text';
    textNode.textContent = taskText;

    // Create a remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'btn btn-danger btn-sm ms-2';
    removeButton.onclick = function() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to recover this task!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                taskList.removeChild(li);
                Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
            }
        });
    };

    // Create an edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'btn btn-warning btn-sm ms-2';
    editButton.onclick = function() {
        if (currentEditTask) {
            Swal.fire('Error', 'Finish editing the current task first!', 'error');
            return;
        }
        currentEditTask = li;
        taskInput.value = textNode.textContent;
        const addButton = document.getElementById('addTaskBtn');
        addButton.textContent = 'Save';
        addButton.classList.add('edit');
    };

    // Append the text node and buttons to the list item
    li.appendChild(textNode);
    li.appendChild(editButton);
    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
}

// Add event listener for 'Add Task' button click
document.getElementById('addTaskBtn').addEventListener('click', addTask);

// Add event listener for 'Enter' key press to add a task
document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
Summary