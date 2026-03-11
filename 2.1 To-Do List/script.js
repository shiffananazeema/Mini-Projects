const input = document.querySelector(".task");
const list = document.querySelector(".list");

let tasks = loadTasks();

function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.dataset.id = task.id;
    li.innerHTML = `${task.title}<span class="close">×</span>`;

    if (task.done) {
      li.classList.add("checked");
    }

    list.appendChild(li);
  });
}

function addTask() {
  const title = input.value.trim();
  if (!title) return;

  tasks.push({
    id: Date.now(),
    title,
    done: false,
  });

  saveTasks();
  render();
  input.value = "";
  input.focus();
}

window.newTask = addTask;

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  if (e.target.classList.contains("close")) {
    tasks = tasks.filter((task) => task.id !== id);
  } else {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    );
  }

  saveTasks();
  render();
});

render();
