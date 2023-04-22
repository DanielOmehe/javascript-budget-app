const addExpenseBtn = document.querySelector(".add-expense"),
  addBudgetBtn = document.querySelector(".add-budget"),
  closeExpenseForm = document.querySelector(".close-expense-form"),
  closeBudgetForm = document.querySelector(".close-expense-form"),
  budgetName = document.querySelector(".expenses-name"),
  budgetDescription = document.querySelector(".expenses-description"),
  budgetAmount = document.querySelector(".expenses-amount"),
  totalBudget = document.querySelector(".total-budget"),
  addExpenseForm = document.querySelector(".add-expense-form"),
  addBudgetForm = document.querySelector(".add-budget-form"),
  chooseCategory = document.querySelector("#choose-category"),
  expensesTable = document.querySelector(".budget-account-table"),
  amount = document.querySelectorAll(".amount"),
  toggleTheme = document.querySelector('.toggle-theme'),
  maxBudgetAmount = document.querySelectorAll(".max");

let expenses = [];
let toggle = false;

toggleTheme.addEventListener('click', ()=>{
  if(toggle){
    toggleTheme.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#fff';
    toggleTheme.style.color = '#fff';
    document.querySelector('.add').style.border = 'var(--outline-light)'
    document.querySelectorAll('.plus').forEach(node => {
      node.style.backgroundColor = 'var(--white)'
    })
    addExpenseBtn.style.border = 'var(--outline-light)';
    addBudgetBtn.style.backgroundColor = 'var(--white)';
    addExpenseBtn.style.color = 'var(--white)';
    addBudgetBtn.style.color = 'var(--black)';
    document.querySelector('.add-new-budget').classList.add('white')
    toggle = false;
  }else{
    toggleTheme.innerHTML = `<i class="fa-solid fa-moon"></i>`
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#000';
    toggleTheme.style.color = '#000';
    document.querySelector('.add').style.border = 'var(--outline-grey)';
    document.querySelectorAll('.plus').forEach((node) => {
      console.log(node);
      node.style.backgroundColor = 'var(--grey)'
    })
    addExpenseBtn.style.border = 'var(--outline)';
    addExpenseBtn.style.color = 'var(--primary)';
    toggle = true;
  }
})

window.addEventListener("load", () => {
  amount.forEach((amount) => {
    amount.innerHTML = generateCurrency(0);
  });
  maxBudgetAmount.forEach((amount) => {
    amount.innerHTML = generateCurrency(0);
  });
});
const string = "abcdefghijklmnopqrstuvqxyz1234567890";

function openDrawer(node){
  document.querySelector(".add-budget-backdrop").classList.add("open");
  node.classList.add('open');
}

function closeDrawer(element){
  document.querySelector(".add-budget-backdrop").classList.remove("open");
  element.classList.remove('open');
}

addExpenseBtn.addEventListener("click", () => openDrawer(addExpenseForm));

addBudgetBtn.addEventListener("click", () => openDrawer(addBudgetForm));

closeExpenseForm.addEventListener("click", () => closeDrawer(addExpenseForm));

closeBudgetForm.addEventListener("click", () => closeDrawer(addBudgetForm));

document.querySelector(".add-budget-backdrop").addEventListener("click", () => {
  document.querySelector(".add-budget-backdrop").classList.remove("open");
  addBudgetForm.classList.remove("open");
  addExpenseForm.classList.remove('open');
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

addExpenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = budgetName.value,
    description = budgetDescription.value,
    amount = budgetAmount.value,
    category = chooseCategory.value;

  if (name === "" || description === "" || amount === "") {
    alert("please fill in all fields");
    e.stopPropagation();
  } else {
    createNewExpense(
      {
        id: generateID(string),
        name,
        description,
        amount: generateCurrency(amount),
        category,
      },
      category
    );
  }

  budgetName.value = "";
  budgetDescription.value = "";
  budgetAmount.value = "";
});

function createNewExpense(expense, category) {
  expenses.push(expense);
  document.querySelector('.add-new-expense').style.display = 'none';
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
};

const editBtns = document.querySelectorAll('.edit');
console.log(editBtns);
