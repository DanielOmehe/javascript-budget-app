const addExpenseBtn = document.querySelector(".add-expense"),
addBudgetBtn = document.querySelector(".add-budget"),
closeBtn = document.querySelector(".close"),
budgetName = document.querySelector(".expenses-name"),
budgetDescription = document.querySelector(".expenses-description"),
budgetAmount = document.querySelector(".expenses-amount"),
totalBudget = document.querySelector('.total-budget'),
addBudgetForm = document.querySelector(".add-budget-form"),
chooseCategory = document.querySelector("#choose-category"),
amount = document.querySelectorAll('.amount');

console.log(chooseCategory.value);

const string = 'abcdefghijklmnopqrstuvqxyz1234567890';

addExpenseBtn.addEventListener("click", () => {
  document.querySelector(".add-budget-backdrop").classList.add("open");
  addBudgetForm.classList.add("open");
});

closeBtn.addEventListener("click", () => {
  document.querySelector(".add-budget-backdrop").classList.remove("open");
  addBudgetForm.classList.remove("open");
});

document.querySelector('.add-budget-backdrop').addEventListener('click', ()=>{
    document.querySelector('.add-budget-backdrop').classList.remove('open');
    addBudgetForm.classList.remove('open');
})

const generateID =(string)=>{
    let idString = '';

    for(let i = 0; i < string.length / 3 ; i++){
        idString += string[Math.floor(Math.random() * string.length)]
    }
    return idString
}

const generateCurrency =(amount)=>{
    const currentcyFormat = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'ngn'
    })

    const currency = currentcyFormat.format(amount);
    return currency
}


addBudgetForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = budgetName.value,
  description = budgetDescription.value,
  amount = budgetAmount.value,
  category = chooseCategory.value

  if (name === "" || description === "" || amount === "") {
    console.log("please fill in all fields");
  }

  createNewExpense({
    id: generateID(string),
    expense: name,
    description,
    amount: generateCurrency(amount),
    totalBudget: generateCurrency(max)
  }, category);
});

function createNewExpense(expense, category){
    
}