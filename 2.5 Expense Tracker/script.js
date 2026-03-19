const titleInput = document.querySelector(".title");
const amountInput = document.querySelector(".amount");
const categoryInput = document.querySelector(".category");
const dateInput = document.querySelector(".date");
const list = document.querySelector(".expense-list");
const totalDisplay = document.querySelector(".total");
const filterInput = document.querySelector(".filter");
const addButton = document.querySelector(".add-btn");

let expenses = loadExpense();
let editId = null;

function loadExpense() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

function saveExpense() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function render() {
  list.innerHTML = "";

  let total = 0;

  const selectedCategory = filterInput.value;

  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  filteredExpenses.forEach((expense) => {
    total += Number(expense.amount);

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="expense-info">
        <strong>${expense.title}</strong>
        <small>${expense.category} | ${expense.date}</small>
      </div>

      <div class="actions">
        <span class="amount-text">$${expense.amount}</span>
        <button class="edit-btn" onclick="editExpense(${expense.id})">Edit</button>
        <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });

  totalDisplay.textContent = total;
}

function addExpense() {
  const title = titleInput.value.trim();
  const amount = amountInput.value;
  const category = categoryInput.value;
  const date = dateInput.value;

  if (!title || !amount || !category || !date) {
    alert("Please fill all fields");
    return;
  }

  if (editId) {
    expenses = expenses.map((expense) =>
      expense.id === editId
        ? { ...expense, title, amount, category, date }
        : expense,
    );

    editId = null;
    addButton.textContent = "Add Expense";
  } else {
    const expense = {
      id: Date.now(),
      title,
      amount,
      category,
      date,
    };

    expenses.push(expense);
  }

  saveExpense();
  render();
  clearInputs();
}

function editExpense(id) {
  const expense = expenses.find((expense) => expense.id === id);

  titleInput.value = expense.title;
  amountInput.value = expense.amount;
  categoryInput.value = expense.category;
  dateInput.value = expense.date;

  editId = id;
  addButton.textContent = "Update Expense";
}

function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);

  if (editId === id) {
    editId = null;
    addButton.textContent = "Add Expense";
    clearInputs();
  }

  saveExpense();
  render();
}

function clearInputs() {
  titleInput.value = "";
  amountInput.value = "";
  categoryInput.value = "";
  dateInput.value = "";
}

filterInput.addEventListener("change", render);

render();
