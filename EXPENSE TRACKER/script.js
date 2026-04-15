let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  let amount = document.getElementById("amount").value;
  let desc = document.getElementById("desc").value;
  let category = document.getElementById("category").value;

  if (amount === "" || desc === "") {
    alert("Fill all fields");
    return;
  }

  let expense = {
    id: Date.now(),
    amount: Number(amount),
    desc,
    category,
    date: new Date().toISOString()
  };

  expenses.push(expense);
  updateUI();
}

function updateUI() {
  let list = document.getElementById("list");
  let total = document.getElementById("total");

  list.innerHTML = "";
  let sum = 0;

  expenses.forEach(e => {
    sum += e.amount;

    let li = document.createElement("li");
    li.innerHTML = `
      ${e.desc} (${e.category}) - ₹${e.amount}
      <button onclick="deleteExpense(${e.id})">❌</button>
    `;
    list.appendChild(li);
  });

  total.innerText = sum;
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  updateUI();
}

updateUI();