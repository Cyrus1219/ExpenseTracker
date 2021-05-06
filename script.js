const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 320 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: -150 },
];

let transaction =
  localStorage.getItem('transactions') !== null
    ? localStorageTransactions
    : dummyTransactions;

// transaction = dummyTransactions;

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transaction));
}

function removeTrans(id) {
  transaction = transaction.filter((trans) => trans.id != id);

  updateLocalStorage();

  init();
}

function updateValues() {
  const amounts = transaction.map((trans) => trans.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  console.log(income);

  var expense = amounts
    .filter((item) => item < 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  expense = expense * -1;
  console.log(expense);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

function addTransactionDOM(transaction) {
  console.log(' transaction is : ', transaction);
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )} </span> <button class="delete-btn" onclick="removeTrans(${
    transaction.id
  })">X</button>
    `;
  list.appendChild(item);
}

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('add text and amount');
  } else {
    const transactions = {
      id: genID(),
      text: text.value,
      amount: +amount.value,

      // by defaul it is a string !! so to make it a number we add + sign
    };
    console.log(transactions);

    transaction.push(transactions);
    addTransactionDOM(transactions);
    console.log(transaction);
    updateValues();
    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

function genID() {
  return Math.floor(Math.random() * 10000);
}
// update balance and income :
// update locat srorage ;
// init app :

function init() {
  list.innerHTML = '';
  console.log(transaction, ' trans ');
  transaction.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);
