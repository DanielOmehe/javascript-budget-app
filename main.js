const addExpenseBtn = document.querySelector(".add-expense"),
  addBudgetBtn = document.querySelector(".add-budget"),
  closeExpenseForm = document.querySelector(".close-expense-form"),
  closeBudgetForm = document.querySelector(".close-budget-form"),
  expenseName = document.querySelector(".expenses-name"),
  expenseDescription = document.querySelector(".expenses-description"),
  expenseAmount = document.querySelector(".expenses-amount"),
  budgetName = document.querySelector(".budget-name"),
  budgetAmount = document.querySelector(".budget-amount"),
  chooseBudgetCategory = document.querySelector("#choose-budget-category"),
  totalBudget = document.querySelector(".total-budget"),
  addExpenseForm = document.querySelector(".add-expense-form"),
  addBudgetForm = document.querySelector(".add-budget-form"),
  chooseExpenseCategory = document.querySelector("#choose-category"),
  expensesTable = document.querySelector(".budget-account-table"),
  amount = document.querySelectorAll(".amount"),
  toggleTheme = document.querySelector(".toggle-theme"),
  allBudgets = document.querySelector('.budgets'),
  maxBudgetAmount = document.querySelectorAll(".max");

let expenses = [],
  budgets = [];
let toggle = false;

toggleTheme.addEventListener("click", () => {
  if (toggle) {
    toggleTheme.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#fff";
    toggleTheme.style.color = "#fff";
    document.querySelector(".add").style.border = "var(--outline-light)";
    document.querySelectorAll(".plus").forEach((node) => {
      node.style.backgroundColor = "var(--white)";
    });
    addExpenseBtn.style.border = "var(--outline-light)";
    addBudgetBtn.style.backgroundColor = "var(--white)";
    addExpenseBtn.style.color = "var(--white)";
    addBudgetBtn.style.color = "var(--black)";
    document.querySelector(".add-new-budget").classList.add("white");
    toggle = false;
  } else {
    toggleTheme.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000";
    toggleTheme.style.color = "#000";
    document.querySelector(".add").style.border = "var(--outline-grey)";
    document.querySelectorAll(".plus").forEach((node) => {
      console.log(node);
      node.style.backgroundColor = "var(--grey)";
    });
    addBudgetBtn.style.backgroundColor = "var(--primary)";
    addBudgetBtn.style.color = "var(--white)";
    addExpenseBtn.style.border = "var(--outline)";
    addExpenseBtn.style.color = "var(--primary)";
    toggle = true;
  }
});

window.addEventListener("load", () => {
  amount.forEach((amount) => {
    amount.innerHTML = generateCurrency(0);
  });
  maxBudgetAmount.forEach((amount) => {
    amount.innerHTML = generateCurrency(0);
  });
});
const string = "abcdefghijklmnopqrstuvqxyz1234567890";

function openDrawer(node) {
  document.querySelector(".add-budget-backdrop").classList.add("open");
  node.classList.add("open");
}

function closeDrawer(element) {
  document.querySelector(".add-budget-backdrop").classList.remove("open");
  element.classList.remove("open");
}

addExpenseBtn.addEventListener("click", () => openDrawer(addExpenseForm));

addBudgetBtn.addEventListener("click", () => openDrawer(addBudgetForm));

closeExpenseForm.addEventListener("click", () => closeDrawer(addExpenseForm));

closeBudgetForm.addEventListener("click", () => closeDrawer(addBudgetForm));

document.querySelector(".add-budget-backdrop").addEventListener("click", () => {
  document.querySelector(".add-budget-backdrop").classList.remove("open");
  addBudgetForm.classList.remove("open");
  addExpenseForm.classList.remove("open");
});

const generateID = (string) => {
  let idString = "";

  for (let i = 0; i < string.length / 3; i++) {
    idString += string[Math.floor(Math.random() * string.length)];
  }
  return idString;
};

const generateCurrency = (amount = 0) => {
  const currentcyFormat = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "eur",
  });

  const currency = currentcyFormat.format(amount);
  return currency;
};

addExpenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (expenseName.value === "" || expenseDescription.value === "" || expenseAmount === "") {
    alert("please fill in all fields");
    e.stopPropagation();
  } else {
    createNewExpense(
      {
        id: generateID(string),
        name: expenseName.value,
        description: expenseDescription.value,
        amount: generateCurrency(amount),
        category: chooseExpenseCategory.value,
      },
      chooseCategory.value
    );
  }

  expenseName.value = "";
  expenseDescription.value = "";
  expenseAmount.value = "";
});

addBudgetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (budgetName.value === "" || budgetAmount === "") {
    alert("please fill in all fields");
    e.stopPropagation();
  } else {
    document.querySelector('.add-new-budget').classList.add('hide')
    createNewBudget({
      id: generateID(string),
      name: budgetName.value,
      amount: generateCurrency(budgetAmount.value),
    })
  }

  budgetName.value = "";
  budgetAmount.value = "";
});

function createNewExpense(expense, category) {
  expenses.push(expense);
  document.querySelector(".add-new-expense").style.display = "none";
  expenses.map((expense, index) => {
    expensesTable.innerHTML += `
      <tr class="table-row" id='${expense.id}'>
        <td class='table-cols'>${index + 1}</td>
        <td class='table-cols'>${expense.name}</td>
        <td class='table-cols'>${expense.description}</td>
        <td class='table-cols'>${expense.amount}</td>
        <td class='table-cols'>${expense.category}</td>
        <td class='table-cols'>
          <button class="button edit">
            <i class='fa-solid fa-pen'></i>
          </button>
        </td>
        <td class='table-cols'>
          <button class="button delete">
            <i class='fa-solid fa-trash'></i>
          </button>
        </td>
</tr>`;
  });
}

function createNewBudget(budget) {
  const newBudget = document.createElement('div'),
  budgetTitle = document.createElement('div'),
  budgetHeading = document.createElement('h1'),
  budgetRatio = document.createElement('div'),
  budgetExpenseRatio = document.createElement('p'),
  budgetAmount = document.createElement('p'),
  line = document.createElement('p'),
  progressContainer = document.createElement('div'),
  progress = document.createElement('div'),
  deleteBudget = document.createElement('button');
  deleteBudget.innerText = 'delete budget';

  deleteBudget.classList.add('delete-budget')
  newBudget.classList.add('budget');
  budgetTitle.classList.add('budget-title');
  budgetRatio.classList.add('budget-ratio');
  budgetExpenseRatio.classList.add('amount')
  progressContainer.classList.add('progress-wrapper');
  progress.classList.add('progress');
  progress.style.width = '50%';
  budgetAmount.classList.add('max')
  budgetHeading.innerText = budget.name
  budgetAmount.innerText = budget.amount;
  line.innerText = '/'
  budgetExpenseRatio.innerText = generateCurrency();
  progressContainer.appendChild(progress)
  budgetRatio.appendChild(budgetExpenseRatio);
  budgetRatio.appendChild(line);
  budgetRatio.appendChild(budgetAmount);
  budgetTitle.appendChild(budgetHeading);
  budgetTitle.appendChild(budgetRatio)
  newBudget.appendChild(budgetTitle);
  newBudget.appendChild(progressContainer);
  newBudget.appendChild(deleteBudget);
  allBudgets.appendChild(newBudget)
}

const editBtns = document.querySelectorAll(".edit");
console.log(editBtns);
