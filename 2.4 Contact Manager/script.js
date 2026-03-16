const nameInput = document.querySelector(".name");
const numberInput = document.querySelector(".number");
const emailInput = document.querySelector(".email");
const list = document.querySelector(".contact-list");
const addButton = document.querySelector(".addBtn");

let contacts = loadContacts();
let editId = null;

function loadContacts() {
  return JSON.parse(localStorage.getItem("contacts")) || [];
}

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function render() {
  list.innerHTML = "";

  const sorted = [...contacts].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  );

  sorted.forEach((contact) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="card-top">
        <strong>${contact.name}</strong>
        <button class="menu-btn" onclick="toggleMenu(${contact.id})">⋮</button>
      </div>

      <span>${contact.email}</span>
      <span>${contact.number}</span>

      <div class="menu" id="menu-${contact.id}">
        <button onclick="startEdit(${contact.id})">Edit</button>
        <button onclick="deleteContact(${contact.id})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function addBtn() {
  const name = nameInput.value.trim();
  const number = numberInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !number || !email) {
    alert("Fill all fields.");
    return;
  }

  if (editId) {
    contacts = contacts.map((contact) =>
      contact.id === editId ? { ...contact, name, number, email } : contact,
    );

    editId = null;
    addButton.textContent = "Add Contact";
  } else {
    contacts.push({
      id: Date.now(),
      name,
      number,
      email,
    });
  }

  nameInput.value = "";
  numberInput.value = "";
  emailInput.value = "";

  saveContacts();
  render();
}

function deleteContact(id) {
  contacts = contacts.filter((contact) => contact.id !== id);
  saveContacts();
  render();
}

function startEdit(id) {
  const contact = contacts.find((c) => c.id === id);

  nameInput.value = contact.name;
  numberInput.value = contact.number;
  emailInput.value = contact.email;

  editId = id;
  addButton.textContent = "Update Contact";

  closeMenus();
}

function toggleMenu(id) {
  const menu = document.getElementById(`menu-${id}`);

  document.querySelectorAll(".menu").forEach((m) => {
    if (m !== menu) m.style.display = "none";
  });

  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function closeMenus() {
  document.querySelectorAll(".menu").forEach((m) => {
    m.style.display = "none";
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-btn") && !e.target.closest(".menu")) {
    closeMenus();
  }
});

[nameInput, numberInput, emailInput].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addBtn();
  });
});

window.addBtn = addBtn;
window.deleteContact = deleteContact;
window.startEdit = startEdit;
window.toggleMenu = toggleMenu;

render();
