// create constructor which sets the initial state of the calculator
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
// clear current and previous operands. also sets operation to undefined
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
// convert the currentOperand to string and deletes the last character
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
// add number to current operand
  appendNumber(number) {
    // if period number is period and it is already there, return
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
// selection of the operation. if operation is not selected, return. 
// if operation has been selected, call the compute() function
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    // sets the previous operation to the current operation and empty the current operation
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

// if operations is not a number, return. Else, compute using the selected operator.
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
      case "*":
        computation = prev * current;
        break;
      case "÷":
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    // set the current operand to the result of the computation and empty the previous operand and operation
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

// splits the numbers into integer and decimal parts using (.) as an anchor point. 
  getDisplayNumber(number) {
    // convert number to string to split can be used.
    const stringNumber = number.toString();
    // convert numbers in front of the decimal point to integers
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    // set the decimal digits to the number after the decimal point
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    // if integer digits is not a number, return empty string, else return the integer digits
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    // if decimal digits is not empty, return the integer digits and decimal digits
    if (decimalDigits != null) {
      // return `${integerDisplay}.${decimalDigits}`;
      return this.roundResult(integerDisplay, decimalDigits);
    } else {
      // if decimal digits is empty, only return the integer digits
      return integerDisplay;
    }
  }

  // returns only 4 decimal places
  roundResult(integerDisplay, decimalDigits) {
    if (decimalDigits.length > 4) {
      return `${integerDisplay}.${decimalDigits.slice(0, 4)}`;
    } else {
      return `${integerDisplay}.${decimalDigits}`;
    }
  }

  // displays the operation and calculation. 
  updateDisplay() {
    // sets the text area of current operation
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    // if operation is selected, set the text area of previous operation with previous operand and operator. If operation is not selected, leave it blank
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// create an instance of the calculator
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// add event listeners to the number buttons on keyboard presses
window.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(e) {
  console.log("🚀 ~ e", e.key);
  if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
    calculator.appendNumber(e.key);
    calculator.updateDisplay();
  }
  if (e.key === "=" || e.key === "Enter") {
    calculator.compute();
    calculator.updateDisplay();
  }
  if (e.key === "Backspace") {
    calculator.delete();
    calculator.updateDisplay();
  }
  if (e.key === "Escape") {
    calculator.clear();
    calculator.updateDisplay();
  }
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    calculator.chooseOperation(e.key);
    calculator.updateDisplay();
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
