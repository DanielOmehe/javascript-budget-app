const addExpenseBtn = document.querySelector(".add-expense"),
  addBudgetBtn = document.querySelector(".add-budget"),
  closeBtn = document.querySelector(".close"),
  budgetName = document.querySelector(".expenses-name"),
  budgetDescription = document.querySelector(".expenses-description"),
  budgetAmount = document.querySelector(".expenses-amount"),
  totalBudget = document.querySelector(".total-budget"),
  addBudgetForm = document.querySelector(".add-budget-form"),
  chooseCategory = document.querySelector("#choose-category"),
  expensesTable = document.querySelector(".budget-account-table"),
  amount = document.querySelectorAll(".amount"),
  maxBudgetAmount = document.querySelectorAll(".max");

let expenses = [],
  max = 0;

window.addEventListener("load", () => {
  amount.forEach((amount) => {
    amount.innerHTML = generateCurrency(0);
  });
  maxBudgetAmount.forEach((amount) => {
    amount.innerHTML = generateCurrency(0);
  });
});
const string = "abcdefghijklmnopqrstuvqxyz1234567890";

addExpenseBtn.addEventListener("click", () => {
  document.querySelector(".add-budget-backdrop").classList.add("open");
  addBudgetForm.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  document.querySelector(".add-budget-backdrop").classList.remove("open");
  addBudgetForm.classList.remove("open");
});

document.querySelector(".add-budget-backdrop").addEventListener("click", () => {
  document.querySelector(".add-budget-backdrop").classList.remove("open");
  addBudgetForm.classList.remove("open");
});

const generateID = (string) => {
  let idString = "";

  for (let i = 0; i < string.length / 3; i++) {
    idString += string[Math.floor(Math.random() * string.length)];
  }
  return idString;
};


const generateCurrency = (amount) => {
  const currentcyFormat = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "eur"
  });

  const currency = currentcyFormat.format(amount);
  return currency;
};

addBudgetForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = budgetName.value,
    description = budgetDescription.value,
    amount = budgetAmount.value,
    category = chooseCategory.value,
    max = totalBudget.value;

  if (name === "" || description === "" || amount === "") {
    alert("please fill in all fields");
    e.stopPropagation();
  } else {
    createNewExpense(
      {
        id: generateID(string),
        name: name,
        description,
        amount: generateCurrency(amount),
        category,
        totalBudget: generateCurrency(max),
      },
      category
    );
  }

  budgetName.value = "";
  budgetDescription.value = "";
  budgetAmount.value = "";
  totalBudget.value = "";
});

function createNewExpense(expense, category) {
  expenses.push(expense);
  expenses.map((expense, index) => {
    expensesTable.innerHTML += `
      <tr class="table-row" id='${expense.id}'>
        <td class='table-cols'>${index + 1}</td>
        <td class='table-cols'>${expense.name}</td>
        <td class='table-cols'>${expense.description}</td>
        <td class='table-cols'>${expense.amount}</td>
        <td class='table-cols'>${expense.category}</td>
        <td class='table-cols'>
          <button class="button">
            <i class='fa-solid fa-pen'></i>
          </button>
        </td>
        <td class='table-cols'>
          <button class="button">
            <i class='fa-solid fa-trash'></i>
          </button>
        </td>
</tr>`;
  });
};

