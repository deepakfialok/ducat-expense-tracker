let expenses = [];
let income = 0;

function updateIncome(value) {
  income = parseFloat(value) || 0;
  document.getElementById("income-display").textContent = `₹${income.toFixed(
    2
  )}`;
  updateAnalytics();
}

function addExpense(title, amount, date = new Date()) {
  expenses.push({
    title,
    amount,
    date: new Date(date),
  });
  updateAnalytics();
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("expenses-table");
  tbody.innerHTML = "";

  expenses.forEach((exp) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="p-3">${exp.title}</td>
      <td class="p-3">₹${exp.amount.toFixed(2)}</td>
      <td class="p-3 text-gray-500">${exp.date.toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

function updateAnalytics() {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  let weeklyTotal = 0;
  let monthlyTotal = 0;

  expenses.forEach((exp) => {
    const date = new Date(exp.date);
    if (date >= startOfWeek) weeklyTotal += exp.amount;
    if (date >= startOfMonth) monthlyTotal += exp.amount;
  });

  document.getElementById("weekly-total").textContent = `₹${weeklyTotal.toFixed(
    2
  )}`;
  document.getElementById(
    "monthly-total"
  ).textContent = `₹${monthlyTotal.toFixed(2)}`;
}

// For demo: Add sample expenses
addExpense("Groceries", 1200, "2025-04-06T10:00:00");
addExpense("Internet Bill", 999, "2025-04-01T12:30:00");
addExpense("Dinner", 650, "2025-04-07T20:15:00");
