// Select elements
const balance = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expense");
const transactionList = document.getElementById("transaction-list");
const form = document.getElementById("form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");

// Store transactions (initially from localStorage or empty array)
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Function to update the balance, income, and expenses
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  // Calculate total balance
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  // Calculate income
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  // Calculate expenses
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  // Update UI
  balance.innerText = `₹${total}`;
  incomeDisplay.innerText = `₹${income}`;
  expenseDisplay.innerText = `₹${expense}`;
}

// Function to add a transaction to the list
function addTransactionDOM(transaction) {
  const listItem = document.createElement("li");

  // Add class based on transaction type
  listItem.classList.add(transaction.amount < 0 ? "minus" : "plus");

  listItem.innerHTML = `
    ${transaction.description} <span>₹${transaction.amount}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
  `;

  transactionList.appendChild(listItem);
}

// Function to generate a unique ID
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

// Function to add a transaction
function addTransaction(e) {
  e.preventDefault();

  if (descInput.value.trim() === "" || amountInput.value.trim() === "") {
    alert("Please add a description and amount");
    return;
  }

  const transaction = {
    id: generateID(),
    description: descInput.value,
    amount: +amountInput.value, // Convert string to number
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  updateLocalStorage();

  // Clear input fields
  descInput.value = "";
  amountInput.value = "";
}

// Function to remove a transaction
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

// Function to update local storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Function to initialize the app
function init() {
  transactionList.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

// Event Listener
form.addEventListener("submit", addTransaction);

// Initialize app
init();

