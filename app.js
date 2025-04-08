const incomeCategories = ["Salary", "Bonus", "Investment"];
const expenseCategories = [
  "Food",
  "Transport",
  "Shopping",
  "Utilities",
  "Entertainment",
  "Other",
];

let transactions = [];

// Load transactions from JSON or fallback to dummy data
async function loadTransactions() {
  try {
    const res = await fetch("transactions.json");
    transactions = await res.json();
  } catch (err) {
    console.warn("Failed to load transactions.json. Using dummy data.");
    transactions = [
      {
        type: "expense",
        title: "Pizza",
        amount: 250,
        category: "Food",
        dateTime: new Date().toISOString(),
        note: "Dinner with friends",
      },
      {
        type: "income",
        title: "Freelancing",
        amount: 2000,
        category: "Salary",
        dateTime: new Date().toISOString(),
        note: "Client project",
      },
    ];
  }

  renderDashboard();
  renderRecentTransactions();
}

function renderDashboard() {
  const totalBudget = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  document.getElementById("total-budget").textContent = `₹${totalBudget.toFixed(
    2
  )}`;
  document.getElementById(
    "total-expense"
  ).textContent = `₹${totalExpenses.toFixed(2)}`;
}

function renderRecentTransactions() {
  const list = document.getElementById("recent-transactions");
  list.innerHTML = "";
  transactions
    .slice()
    .reverse()
    .forEach((t) => {
      const icon = t.type === "expense" ? "⬇️" : "⬆️";
      const sign = t.type === "expense" ? "-" : "+";
      const item = `
      <div class="bg-white shadow-md rounded-lg p-4 mb-2">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <span class="text-xl">${icon}</span>
            <div>
              <h4 class="font-bold">${t.title}</h4>
              <p class="text-sm text-gray-500">${t.category}</p>
              <p class="text-xs text-gray-400">${formatDate(t.dateTime)}</p>
            </div>
          </div>
          <div class="text-lg font-semibold ${
            t.type === "expense" ? "text-red-600" : "text-green-600"
          }">
            ${sign}₹${t.amount}
          </div>
        </div>
      </div>
    `;
      list.insertAdjacentHTML("beforeend", item);
    });
}

function openModal() {
  document.getElementById("expense-modal").classList.remove("hidden");
  document.getElementById("amount").value = 100;
  document.getElementById("title").value = "";
  document.getElementById("note").value = "";
  document.getElementById("type").value = "expense";

  updateCategoryOptions("expense");

  const now = new Date();
  const localISOTime = now.toISOString().slice(0, 16);
  document.getElementById("date").value = localISOTime;

  document.getElementById("amount").focus();
}

function closeModal() {
  document.getElementById("expense-modal").classList.add("hidden");
}

function updateCategoryOptions(type) {
  const select = document.getElementById("category");
  const categories = type === "income" ? incomeCategories : expenseCategories;
  select.innerHTML = categories
    .map((cat) => `<option value="${cat}">${cat}</option>`)
    .join("");
}

// Event: switch category when type changes
document.getElementById("type").addEventListener("change", (e) => {
  updateCategoryOptions(e.target.value);
});

// Event: handle form submit
document.getElementById("add-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newEntry = {
    type: document.getElementById("type").value,
    title: document.getElementById("title").value.trim(),
    amount: parseFloat(document.getElementById("amount").value),
    category: document.getElementById("category").value,
    dateTime: document.getElementById("date").value,
    note: document.getElementById("note").value.trim(),
  };

  if (!newEntry.title || isNaN(newEntry.amount)) {
    alert("Please enter a valid title and amount.");
    return;
  }

  transactions.push(newEntry);
  closeModal();
  renderDashboard();
  renderRecentTransactions();

  Toastify({
    text: `${newEntry.type === "expense" ? "Expense" : "Income"} added!`,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#10b981",
  }).showToast();
});

// Utility: format datetime string
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// Initialize on load
document.addEventListener("DOMContentLoaded", loadTransactions);
