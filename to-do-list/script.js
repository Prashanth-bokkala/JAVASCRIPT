document.addEventListener("DOMContentLoaded", function () {
    var taskInput = document.getElementById("taskInput");
    var addTaskBtn = document.getElementById("addTaskBtn");
    var taskList = document.getElementById("taskList");

    function addTask() {
        var taskText = taskInput.value.trim();

        if (taskText !== "") {
            var taskItem = document.createElement("li");
            taskItem.className = "taskItem";
            taskItem.innerHTML = `
                <span>${taskText}</span>
                <button class="deleteBtn">Delete</button>
            `;

            taskList.appendChild(taskItem);

            taskInput.value = "";

            var deleteBtn = taskItem.querySelector(".deleteBtn");
            deleteBtn.addEventListener("click", function () {
                taskList.removeChild(taskItem);
            });

            taskItem.addEventListener("click", function () {
                taskItem.classList.toggle("completed");
            });
        }
    }

    addTaskBtn.addEventListener("click", addTask);
});
