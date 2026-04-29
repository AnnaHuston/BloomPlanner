// ---------- Planner ----------
function updateProgress() {
    var taskCheckboxes = document.querySelectorAll(".task-check");
    var totalTasks = taskCheckboxes.length;
    var completedTasks = 0;
    var i;

    for (i = 0; i < totalTasks; i++) {
        if (taskCheckboxes[i].checked) {
            completedTasks++;
        }
    }

    var percent = 0;
    if (totalTasks > 0) {
        percent = Math.round((completedTasks / totalTasks) * 100);
    }

    var progressText = document.getElementById("progressText");
    var progressBar = document.getElementById("progressBar");
    var plannerMessage = document.getElementById("plannerMessage");

    if (progressText) {
        progressText.innerHTML = completedTasks + " of " + totalTasks + " tasks complete";
    }

    if (progressBar) {
        progressBar.style.width = percent + "%";
        progressBar.innerHTML = percent + "%";
    }

    if (plannerMessage) {
        if (totalTasks === 0) {
            plannerMessage.innerHTML = "Add a few tasks to get started.";
        } else if (percent === 100) {
            plannerMessage.innerHTML = "Everything is complete. Your day is in full bloom.";
        } else if (percent >= 50) {
            plannerMessage.innerHTML = "Nice progress. Keep going.";
        } else {
            plannerMessage.innerHTML = "A little progress still counts.";
        }
    }
}

function updateEmptyMessage() {
    var taskList = document.getElementById("taskList");
    var emptyMessage = document.getElementById("emptyMessage");

    if (taskList && emptyMessage) {
        var taskItems = taskList.querySelectorAll(".task-item");
        if (taskItems.length === 0) {
            emptyMessage.style.display = "block";
        } else {
            emptyMessage.style.display = "none";
        }
    }
}

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (!taskInput || !taskList) {
        return;
    }

    var taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please type a task before adding it.");
        return;
    }

    var taskItem = document.createElement("div");
    taskItem.className = "task-item";

    var taskLeft = document.createElement("div");
    taskLeft.className = "task-left";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input task-check";

    var label = document.createElement("p");
    label.className = "task-label";
    label.innerHTML = taskText;

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            label.classList.add("completed");
        } else {
            label.classList.remove("completed");
        }
        updateProgress();
    });

    taskLeft.appendChild(checkbox);
    taskLeft.appendChild(label);
    taskItem.appendChild(taskLeft);
    taskList.appendChild(taskItem);

    taskInput.value = "";
    updateEmptyMessage();
    updateProgress();
}


function resetAllTasks() {
    var taskList = document.getElementById("taskList");
    if (taskList) {
        var taskItems = taskList.querySelectorAll(".task-item");
        var i;
        for (i = 0; i < taskItems.length; i++) {
            taskItems[i].remove();
        }
    }

    updateEmptyMessage();
    updateProgress();
}

// ---------- Fun facts ----------
function showFunFact() {
    var facts = [
        "Roses are related to apples, raspberries, cherries, peaches, plums, nectarines, pears and almonds.",
        "Moon flowers bloom only at night, closing during the day.",
        "Some flowers are carnivorous and trap insects to digest them.",
        "Some flowers are capable of moving, a trait that is known as thigmotropism.",
        "Broccoli is actually a flower."
    ];

    var randomIndex = Math.floor(Math.random() * facts.length);
    var factText = document.getElementById("factText");

    if (factText) {
        factText.innerHTML = facts[randomIndex];
    }
}

// ---------- Word of the day ----------
function showWord() {
    var words = [
        "Diligent: careful and hardworking.",
        "Cultivate: to develop or improve something over time.",
        "Serene: calm and peaceful.",
        "Aspire: to hope or aim for something great.",
        "Momentum: the force that keeps something moving forward."
    ];

    var randomIndex = Math.floor(Math.random() * words.length);
    var wordText = document.getElementById("wordText");

    if (wordText) {
        wordText.innerHTML = words[randomIndex];
    }
}

// ---------- Focus timer ----------
var timerSeconds = 1500;
var timerInterval = null;

function updateTimerDisplay() {
    var display = document.getElementById("timerDisplay");
    if (!display) {
        return;
    }

    var minutes = Math.floor(timerSeconds / 60);
    var seconds = timerSeconds % 60;

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    display.innerHTML = minutes + ":" + seconds;
}

function startTimer() {
    var timerMessage = document.getElementById("timerMessage");

    if (timerInterval !== null) {
        return;
    }

    if (timerMessage) {
        timerMessage.innerHTML = "Focus session in progress.";
    }

    timerInterval = setInterval(function () {
        if (timerSeconds > 0) {
            timerSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            if (timerMessage) {
                timerMessage.innerHTML = "Great job! Your focus session is complete.";
            }
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;

    var timerMessage = document.getElementById("timerMessage");
    if (timerMessage) {
        timerMessage.innerHTML = "Timer paused.";
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSeconds = 1500;
    updateTimerDisplay();

    var timerMessage = document.getElementById("timerMessage");
    if (timerMessage) {
        timerMessage.innerHTML = "Timer reset.";
    }
}

// ---------- Event listeners ----------
document.addEventListener("DOMContentLoaded", function () {
    var addTaskButton = document.getElementById("addTaskButton");
    var taskInput = document.getElementById("taskInput");
    var resetAllButton = document.getElementById("resetAllButton");
    var factButton = document.getElementById("factButton");
    var wordButton = document.getElementById("wordButton");
    var startTimerButton = document.getElementById("startTimerButton");
    var pauseTimerButton = document.getElementById("pauseTimerButton");
    var resetTimerButton = document.getElementById("resetTimerButton");

    if (addTaskButton) {
        addTaskButton.addEventListener("click", addTask);
    }

    if (taskInput) {
        taskInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                addTask();
            }
        });
    }

    if (resetAllButton) {
        resetAllButton.addEventListener("click", resetAllTasks);
    }

    if (factButton) {
        factButton.addEventListener("click", showFunFact);
    }

    if (wordButton) {
        wordButton.addEventListener("click", showWord);
    }

    if (startTimerButton) {
        startTimerButton.addEventListener("click", startTimer);
    }

    if (pauseTimerButton) {
        pauseTimerButton.addEventListener("click", pauseTimer);
    }

    if (resetTimerButton) {
        resetTimerButton.addEventListener("click", resetTimer);
    }

    updateEmptyMessage();
    updateProgress();
    updateTimerDisplay();
});
