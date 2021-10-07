/* 
  Table of Contents:
  1. Query selectors
  2. Global variables
  3. Handling user input
    3.1 User clicks a button
    3.2 User types in an input
  4. Defining functions
*/

//1. Query selectors
const billElement = document.querySelector("#bill-amount");
const peopleElement = document.querySelector("#number-of-people");
const customPercentTip = document.querySelector(".custom-tip");
const tipPerPersonElement = document.querySelector(".tip-per-person > p");
const totalPerPersonElement = document.querySelector(".amount-per-person > p");
const inputs = Array.from(document.querySelectorAll("input"));
const buttons = Array.from(document.querySelectorAll("button"));

// 2. Global variables
let data = {
  bill: 0,
  tipPercent: 0,
  numPeople: 0,
};

// 3. Handling user input
// 3.1 User clicks a button
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    //if it is a tip percent selection update the tip percentage. Otherwise, reset all the data
    if (e.target.classList.contains("tip-pct")) {
      data.tipPercent = parseFloat(e.target.dataset.tipamount);

      if (data.bill > 0 && data.numPeople > 0) {
        calculateSharedBillWithTip(data.bill, data.tipPercent, data.numPeople);
      }
      return;
    }
    setToInitalState();
  });
});

//3.2 User types in an input
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    //if it is bill amount update data.bill
    if (e.target.id === "bill-amount") {
      data.bill = parseFloat(e.target.value);
    }

    //if it is custom tip update data.tipPercent
    if (e.target.id === "custom-percent") {
      e.target.value
        ? (data.tipPercent = parseFloat(e.target.value))
        : (data.tipPercent = 0);
    }

    //if it is num of people update data.numPeople
    if (e.target.name === "number-of-people") {
      data.numPeople = parseFloat(e.target.value);
    }

    if (data.bill > 0 && data.numPeople > 0) {
      calculateSharedBillWithTip(data.bill, data.tipPercent, data.numPeople);
    }
  });
});

// 4. Defining functions
function calculateSharedBillWithTip(bill, tipPercent, numOfPeople) {
  //convert tip percent to a decimal
  tipPercent = tipPercent / 100;

  //calculate each person's share of the tip
  let tipTotal = bill * tipPercent;
  let tipPerPerson = tipTotal / numOfPeople;

  //calculate each person's share of the total bill
  let totalOwed = bill + tipTotal;
  let totalPerPerson = totalOwed / numOfPeople;

  //update ui
  tipPerPersonElement.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalPerPersonElement.textContent = `$${totalPerPerson.toFixed(2)}`;
}

function setToInitalState() {
  //reset all of our state
  tipPerPersonElement.textContent = `$0.00`;
  totalPerPersonElement.textContent = `$0.00`;
  customPercentTip.value = "";
  billElement.value = "";
  peopleElement.value = "";

  data = {
    bill: 0,
    tipPercent: 0,
    numPeople: 0,
  };
}
