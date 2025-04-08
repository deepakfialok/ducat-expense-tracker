let income = 0;
let expenses = [];

function updateIncome(value) {
  income = parseFloat(value) || 0;
  document.getElementById("income-display").textContent = `₹${income.toFixed(
    2
  )}`;
  updateAnalytics();
}

function addExpense(title, amount, date = new Date()) {
  expenses.push({ title, amount: parseFloat(amount), date: new Date(date) });
  renderExpenses();
  updateAnalytics();
}

function renderExpenses() {
  const list = document.getElementById("expenses-list");
  list.innerHTML = "";

  expenses
    .slice()
    .reverse()
    .forEach((exp) => {
      const item = document.createElement("div");
      item.className = "flex justify-between items-center border-b pb-2";
      item.innerHTML = `
      <div>
        <p class="font-medium">${exp.title}</p>
        <p class="text-xs text-gray-500">${exp.date.toLocaleString()}</p>
      </div>
      <div class="text-red-500 font-bold">₹${exp.amount.toFixed(2)}</div>
    `;
      list.appendChild(item);
    });
}

function updateAnalytics() {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  let weeklyTotal = 0,
    monthlyTotal = 0;

  expenses.forEach((e) => {
    const d = new Date(e.date);
    if (d >= startOfWeek) weeklyTotal += e.amount;
    if (d >= startOfMonth) monthlyTotal += e.amount;
  });

  document.getElementById("weekly-total").textContent = `₹${weeklyTotal.toFixed(
    2
  )}`;
  document.getElementById(
    "monthly-total"
  ).textContent = `₹${monthlyTotal.toFixed(2)}`;
}

function addExpensePrompt() {
  const title = prompt("Expense Title:");
  const amount = prompt("Expense Amount (₹):");
  if (title && amount && !isNaN(amount)) {
    addExpense(title, parseFloat(amount));
  } else {
    alert("Invalid input!");
  }
}

// Load with demo data
addExpense("Milk", 40);
addExpense("Recharge", 199);
addExpense("Auto fare", 80);
