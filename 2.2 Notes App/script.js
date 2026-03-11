const input = document.querySelector(".title");
const notesContainer = document.querySelector(".notes");

let notesData = loadNotes();

function formatDateTime() {
  return new Date().toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function loadNotes() {
  return JSON.parse(localStorage.getItem("notesApp")) || [];
}

function saveNotes() {
  localStorage.setItem("notesApp", JSON.stringify(notesData));
}

function render() {
  notesContainer.innerHTML = "";

  notesData.forEach((note) => {
    const card = document.createElement("div");
    card.className = "container";
    card.dataset.id = note.id;
    card.innerHTML = `
      <div class="top">
        <span class="container-title">${note.title}</span>
        <span class="close">x</span>
      </div>
      <p class="container-note ${note.text ? "" : "empty"}" data-placeholder="Write the notes here...">${note.text}</p>
      <span class="date">${note.date}</span>
    `;
    notesContainer.appendChild(card);
  });
}

function addNote() {
  const title = input.value.trim();
  if (!title) return;

  notesData.push({
    id: Date.now(),
    title,
    text: "",
    date: formatDateTime(),
  });

  saveNotes();
  render();
  input.value = "";
  input.focus();
}

function openEditor(card) {
  document.querySelector(".overlay")?.remove();
  document.querySelector(".editor")?.remove();

  const id = Number(card.dataset.id);
  const currentNote = notesData.find((note) => note.id === id);
  if (!currentNote) return;

  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const editor = document.createElement("div");
  editor.className = "editor";
  editor.innerHTML = `
    <div class="top">
      <div class="container-title" contenteditable="true">${currentNote.title}</div>
      <span class="close">x</span>
    </div>
    <div class="container-note" contenteditable="true" data-placeholder="Write the notes here...">${currentNote.text}</div>
    <span class="date">${currentNote.date}</span>
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

    notesData = notesData.map((note) =>
      note.id === id
        ? {
            ...note,
            title: newTitle || "Untitled",
            text: newText,
            date: formatDateTime(),
          }
        : note,
    );

    saveNotes();
    render();
    overlay.remove();
    editor.remove();
  }

  overlay.addEventListener("click", closeEditor);
  editor.querySelector(".close").addEventListener("click", closeEditor);
}

window.addNote = addNote;

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNote();
});

notesContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".container");
  if (!card) return;

  const id = Number(card.dataset.id);

  if (e.target.classList.contains("close")) {
    notesData = notesData.filter((note) => note.id !== id);
    saveNotes();
    render();
    return;
  }

  if (
    e.target.classList.contains("container-title") ||
    e.target.classList.contains("container-note")
  ) {
    openEditor(card);
  }
});

render();
