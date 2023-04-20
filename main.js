const addExpenseBtn = document.querySelector(".expense");
const closeBtn = document.querySelector(".close");
const budgetName = document.querySelector(".name");
const budgetDescription = document.querySelector(".description");
const budgetAmount = document.querySelector(".amount");
const addBudgetForm = document.querySelector(".add-budget-form");
const chooseCategory = document.querySelector("#choose-category");

addExpenseBtn.addEventListener("click", (e) => {
  document.querySelector(".add-budget").classList.add("open");
  document.querySelector(".add-budget-form").classList.add("open");
});

closeBtn.addEventListener("click", () => {
  document.querySelector(".add-budget").classList.remove("open");
  document.querySelector(".add-budget-form").classList.remove("open");
});

addBudgetForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = budgetName.value;
  const description = budgetDescription.value;
  const amount = budgetAmount.value;

  if (name === "" || description === "" || amount === "") {
    console.log("please fill in all fields");
  }
});

document.querySelector(".add-budget").addEventListener("click", () => {
  document.querySelector(".add-budget").classList.remove("open");
  document.querySelector(".add-budget-form").classList.remove("open");
});
