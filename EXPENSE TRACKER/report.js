let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function filterData() {
  let start = new Date(document.getElementById("startDate").value);
  let end = new Date(document.getElementById("endDate").value);

  let list = document.getElementById("reportList");
  list.innerHTML = "";

  let categoryData = {};

  expenses.forEach(e => {
    let d = new Date(e.date);

    if (d >= start && d <= end) {
      let li = document.createElement("li");
      li.innerText = `${e.desc} (${e.category}) - ₹${e.amount}`;
      list.appendChild(li);

      // category sum
      if (!categoryData[e.category]) {
        categoryData[e.category] = 0;
      }
      categoryData[e.category] += e.amount;
    }
  });

  drawChart(categoryData);
}

function drawChart(data) {
  let ctx = document.getElementById("chart");

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data)
      }]
    }
  });
}