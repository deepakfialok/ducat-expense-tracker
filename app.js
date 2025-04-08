let expenses = [];
let income = 0;

function updateIncome(val) {
  income = parseFloat(val);
  document.getElementById("income-display").innerText = income;
}

function openModal() {
  document.getElementById("expense-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("expense-modal").classList.add("hidden");
  document.querySelector("form").reset();
}

function submitExpense(e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const date = new Date(document.getElementById("date").value);

  const expense = { amount, category, description, date };
  expenses.push(expense);
  closeModal();
  updateUI();
}

function updateUI() {
  const list = document.getElementById("expenses-list");
  list.innerHTML = "";
  let weekly = 0,
    monthly = 0;
  const now = new Date();
  const catTotals = {};

  expenses.forEach((exp) => {
    const diffDays = (now - new Date(exp.date)) / (1000 * 3600 * 24);
    if (diffDays <= 7) weekly += exp.amount;
    if (now.getMonth() === new Date(exp.date).getMonth()) monthly += exp.amount;

    // Render each expense
    const item = document.createElement("div");
    item.className = "border p-2 rounded-md bg-gray-50";
    item.innerHTML = `
      <div class="font-semibold text-gray-800">₹${exp.amount} - ${
      exp.category
    }</div>
      <div class="text-sm text-gray-500">${
        exp.description || "No description"
      } - ${new Date(exp.date).toLocaleString()}</div>
    `;
    list.appendChild(item);

    // Category Totals
    catTotals[exp.category] = (catTotals[exp.category] || 0) + exp.amount;
  });

  document.getElementById("weekly-total").innerText = `₹${weekly}`;
  document.getElementById("monthly-total").innerText = `₹${monthly}`;

  updateChart(catTotals);
}

// Chart.js
let chart;
function updateChart(data) {
  const ctx = document.getElementById("category-chart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.values(data),
          backgroundColor: [
            "#6366f1",
            "#f97316",
            "#10b981",
            "#eab308",
            "#ef4444",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
}
