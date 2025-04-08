let expenses = [];

function addExpense() {
  const titleInput = document.getElementById("expense-title");
  const amountInput = document.getElementById("expense-amount");

  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!title || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid title and positive amount.");
    return;
  }

  const expense = {
    id: Date.now(),
    title,
    amount,
  };

  expenses.push(expense);
  titleInput.value = "";
  amountInput.value = "";

  renderExpenses();
}

function deleteExpense(id) {
  expenses = expenses.filter((e) => e.id !== id);
  renderExpenses();
}

function renderExpenses() {
  const tbody = document.getElementById("expenses-list");
  const totalEl = document.getElementById("total");

  tbody.innerHTML = "";
  let total = 0;

  expenses.forEach((exp) => {
    total += exp.amount;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="p-3 font-medium text-gray-800">${exp.title}</td>
      <td class="p-3 text-gray-600">₹${exp.amount.toFixed(2)}</td>
      <td class="p-3 text-right">
        <button onclick="deleteExpense(${exp.id})"
          class="text-red-500 hover:text-red-700 font-semibold text-sm">
          ❌ Delete
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });

  totalEl.textContent = total.toFixed(2);
}
