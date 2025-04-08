async function loadAndRenderAnalytics() {
  try {
    const res = await fetch("transactions.json");
    const transactions = await res.json();

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const categoryTotals = {};

    transactions.forEach((t) => {
      const date = new Date(t.dateTime);
      if (
        t.type === "expense" &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      ) {
        if (!categoryTotals[t.category]) {
          categoryTotals[t.category] = 0;
        }
        categoryTotals[t.category] += parseFloat(t.amount);
      }
    });

    const categories = Object.keys(categoryTotals);
    const amounts = Object.values(categoryTotals);
    const total = amounts.reduce((a, b) => a + b, 0);
    const percentages = amounts.map((a) => ((a / total) * 100).toFixed(2));

    const backgroundColors = [
      "#ef4444",
      "#f59e0b",
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
      "#ec4899",
      "#14b8a6",
    ];

    const ctx = document.getElementById("categoryChart").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Expenses by Category",
            data: amounts,
            backgroundColor: backgroundColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    const legendContainer = document.getElementById("categoryLegend");
    legendContainer.innerHTML = categories
      .map(
        (cat, i) => `
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <span class="w-4 h-4 inline-block mr-2 rounded-full" style="background-color:${
              backgroundColors[i % backgroundColors.length]
            }"></span>
            <span>${cat}</span>
          </div>
          <span class="font-semibold">${percentages[i]}%</span>
        </div>
      `
      )
      .join("");
  } catch (err) {
    alert("Failed to load data for analytics.");
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", loadAndRenderAnalytics);
