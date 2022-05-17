const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const addArr = (arr) => arr.reduce((total, value) => total + value, 0);

const multiplyArr = (arr) => arr.reduce((total, value) => total * value, 1);

const divideArr = (arr) => arr.reduce((total, value) => total / value);

const operate = (operator, a, b) => {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
};

// grabs all buttons on the calculator
const getButtons = document.querySelectorAll(".calc-buttons");
// grabs display
const display = document.querySelector(".display");
// grabs equals button
const equalSign = document.getElementById("equals");

// loop through the buttons and add event listeners for certain classes
getButtons.forEach((buttons) => displayButtons(buttons));

function displayButtons(buttons) {
  if (buttons.classList.contains("numbers")) {
    buttons.addEventListener("click", (e) => {
      let number = e.target.textContent;
      display.textContent += `${number}`;
    });
  }

  if (buttons.classList.contains("operators")) {
    buttons.addEventListener("click", (e) => {
      let operator = e.target.textContent;
      display.textContent += ` ${operator} `;
    });
  }
}

// when equal sign is clicked, calculate the math on display and display the result in the display.
when equal sign is clicked
equalSign.onclick = () => {
  
}

perform the math

display the result on display