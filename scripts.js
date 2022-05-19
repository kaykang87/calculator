const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator-keys");
const display = calculator.querySelector(".calculator-display");

keys.addEventListener("click", (e) => {
  // if target is not a button, return
  if (!e.target.closest("button")) return;

  const key = e.target;
  const keyValue = e.target.textContent;
  const displayValue = display.textContent;

  // if key is a number
  if (key.classList.contains("numbers")) {
    if (displayValue === "0") {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  // if key operator
  key.dataset.keyType === "operator";
  if (key.classList.contains("operator")) {
    calculator.dataset.previousKeyType = "operator";
  }
});
