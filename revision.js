let totalMinutes = 0;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const timeInput = document.getElementById('timeInput');
    const task = taskInput.value;
    const time = timeInput.value;

    if (task && time) {
        const listItem = document.createElement('tr');
        const timeInMinutes = convertToMinutes(time);
        totalMinutes += timeInMinutes;

        listItem.innerHTML = `
            <td>${task}</td>
            <td>${time}</td>
            <td><button onclick="deleteTask(this)">Delete</button></td>
        `;
        document.getElementById('todo-list').appendChild(listItem);
        updateTotalTime();

        // Clear input fields
        taskInput.value = '';
        timeInput.value = '';
    } else {
        alert('Please enter both a task and time required.');
    }
}

function deleteTask(button) {
    const row = button.closest('tr');
    const timeInMinutes = convertToMinutes(row.children[1].textContent);

    totalMinutes -= timeInMinutes;
    updateTotalTime();

    row.remove();
}

function updateTotalTime() {
    const totalSpan = document.getElementById('total');
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    totalSpan.textContent = `${hours}h ${minutes}m`;
}

function convertToMinutes(time) {
    const [hours, minutes] = time.split('h').map(part => parseInt(part.trim()) || 0);
    return hours * 60 + minutes;
}
