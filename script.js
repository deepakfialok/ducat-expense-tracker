const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const addTransactionButton = document.getElementById("addTransaction");
const transactionListElement = document.getElementById("transactionList");
const totalBudgetElement = document.getElementById("totalBudget");
const totalExpenseElement = document.getElementById("totalExpense");
const remainingAmountElement = document.getElementById("remainingAmount");
const totalBalanceElement = document.getElementById("totalBalance");

let transactions = [];
const BASE_BUDGET = 50000;

transactions = sampleTransactions;

function renderTransactions() {
  transactionListElement.innerHTML = ""; // Clear the current list
  let totalIncome = BASE_BUDGET;
  let totalExpense = 0;

  transactions.forEach((transaction, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("py-2", "flex", "justify-between", "items-center");
    const sign = transaction.type === "income" ? "+" : "-";
    const colorClass =
      transaction.type === "income" ? "text-green-500" : "text-red-500";
    listItem.innerHTML = `
          <div>
              <span class="font-semibold">${transaction.description}</span>
              <span class="text-gray-500 text-sm">(${transaction.category})</span>
          </div>
          <span class="${colorClass}">${sign}₹${transaction.amount}</span>
          <button class="text-red-500 hover:text-red-700 focus:outline-none" onclick="deleteTransaction(${index})">
              <i class="fas fa-trash-alt"></i>
          </button>
      `;
    transactionListElement.appendChild(listItem);

    if (transaction.type === "income") {
      totalIncome += parseFloat(transaction.amount);
    } else {
      totalExpense += parseFloat(transaction.amount);
    }
  });

  const remaining = totalIncome - totalExpense;
  totalBudgetElement.textContent = `₹${totalIncome.toFixed(2)}`;
  totalExpenseElement.textContent = `₹${totalExpense.toFixed(2)}`;
  remainingAmountElement.textContent = `₹${remaining.toFixed(2)}`;

  // Corrected color application logic
  remainingAmountElement.classList.remove("text-green-500", "text-red-500");
  if (remaining >= 0) {
    remainingAmountElement.classList.add("text-green-500");
  } else {
    remainingAmountElement.classList.add("text-red-500");
  }

  totalBalanceElement.textContent = `Balance: ₹${remaining.toFixed(2)}`;
}

// Function to add a new transaction (income or expense)
function addTransaction() {
  const type = typeInput.value;
  const category = categoryInput.value;
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (description && !isNaN(amount)) {
    const newTransaction = {
      type: type,
      category: category,
      description: description,
      amount: amount,
    };
    transactions.push(newTransaction);
    descriptionInput.value = "";
    amountInput.value = "";
    renderTransactions();
  } else {
    alert(
      "Please select a type, category, enter a valid description and amount."
    );
  }
}

// Function to delete a transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
}

addTransactionButton.addEventListener("click", addTransaction);

renderTransactions();
