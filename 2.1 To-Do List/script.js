const input = document.querySelector(".task");
const list = document.querySelector(".list");

function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

let tasks = loadTasks();

function addCloseButton(li) {
  const span = document.createElement("span");
  span.className = "close";
  span.textContent = "×";
  li.appendChild(span);
}

function render() {
  list.innerHTML = "";
  tasks.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t.title;
    li.dataset.id = String(t.id);

    if (t.done) li.classList.add("checked");

    addCloseButton(li);
    list.appendChild(li);
  });
}

function newTask() {
  const title = input.value.trim();
  if (!title) return;

  const task = { id: Date.now(), title, done: false };
  tasks.push(task);

  saveTasks(tasks);
  render();

  input.value = "";
  input.focus();
}

window.newTask = newTask;

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") newTask();
});

list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  if (e.target.classList.contains("close")) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks(tasks);
    render();
    return;
  }

  tasks = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  saveTasks(tasks);
  render();
});

render();
