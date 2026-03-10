const input = document.querySelector(".title");
const addBtn = document.querySelector(".addBtn");
const notes = document.querySelector(".notes");

function formatDateTime() {
  return new Date().toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function saveNotes() {
  const allNotes = [...document.querySelectorAll(".container")].map((note) => ({
    title: note.querySelector(".container-title").textContent,
    text: note.querySelector(".container-note").classList.contains("empty")
      ? ""
      : note.querySelector(".container-note").textContent,
    date: note.querySelector(".date").textContent,
  }));

  localStorage.setItem("notesApp", JSON.stringify(allNotes));
}

function createNote(title, text = "", date = formatDateTime()) {
  const note = document.createElement("div");
  note.className = "container";

  note.innerHTML = `
    <div class="top">
      <span class="container-title">${title}</span>
      <span class="close">x</span>
    </div>
    <p class="container-note ${text ? "" : "empty"}" data-placeholder="Write the notes here...">${text}</p>
    <span class="date">${date}</span>
  `;

  notes.appendChild(note);
}

function addNote() {
  const title = input.value.trim();
  if (!title) return;

  createNote(title);
  input.value = "";
  saveNotes();
}

function loadNotes() {
  const saved = JSON.parse(localStorage.getItem("notesApp")) || [];
  saved.forEach((note) => createNote(note.title, note.text, note.date));
}

function openEditor(card) {
  document.querySelector(".overlay")?.remove();
  document.querySelector(".editor")?.remove();

  const titleEl = card.querySelector(".container-title");
  const noteEl = card.querySelector(".container-note");
  const dateEl = card.querySelector(".date");

  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const editor = document.createElement("div");
  editor.className = "editor";
  editor.innerHTML = `
    <div class="top">
      <div class="container-title" contenteditable="true">${titleEl.textContent}</div>
      <span class="close">x</span>
    </div>
    <div class="container-note" contenteditable="true" data-placeholder="Write the notes here...">
      ${noteEl.classList.contains("empty") ? "" : noteEl.textContent}
    </div>
    <span class="date">${dateEl.textContent}</span>
  `;

  document.body.append(overlay, editor);

  setTimeout(() => {
    editor.classList.add("show");
    editor.querySelector(".container-note").focus();
  }, 10);

  function closeEditor() {
    const newTitle = editor
      .querySelector(".container-title")
      .textContent.trim();
    const newText = editor.querySelector(".container-note").textContent.trim();

    titleEl.textContent = newTitle || "Untitled";
    noteEl.textContent = newText;

    noteEl.classList.toggle("empty", !newText);
    dateEl.textContent = formatDateTime();

    saveNotes();
    overlay.remove();
    editor.remove();
  }

  overlay.onclick = closeEditor;
  editor.querySelector(".close").onclick = closeEditor;
}

addBtn.addEventListener("click", addNote);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNote();
});

notes.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    e.target.closest(".container").remove();
    saveNotes();
  }

  if (
    e.target.classList.contains("container-title") ||
    e.target.classList.contains("container-note")
  ) {
    openEditor(e.target.closest(".container"));
  }
});

loadNotes();
