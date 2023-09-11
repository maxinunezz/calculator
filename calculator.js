class Calculator {
  constructor(operandElement, operand2Element) {
    this.operandElement = operandElement;
    this.operand2Element = operand2Element;
    this.clear();
  }
  clear() {
    this.operand1 = 0;
    this.operand2 = 0;
    this.operator = "";
    this.updateUI();
  }
  updateUI() {
    this.operandElement.innerHTML = this.operand1 + this.operator;
    this.operand2Element.innerHTML = this.operand2;
  }

  appendNumber(number) {
    if (number === "." && this.operand2.includes(".")) return;
    this.operand2 =
      this.operand2 === 0 ? number : this.operand2.toString() + number;
    this.updateUI();
  }

  delete() {
    if (this.operand2 === 0) return;
    this.operand2 = +this.operand2.toString().slice(0, -1);
    this.updateUI();
  }

  operation(operator) {
    if (this.operator) {
      this.calculation();
    }
    this.operator = operator;
    this.operand1 = +this.operand2 === 0 ? this.operand1 : this.operand2;
    this.operand2 = 0;
    this.updateUI();
  }

  calculation() {
    switch (this.operator) {
      case "+":
        this.operand1 = +this.operand1 + +this.operand2;
        break;
      case "-":
        this.operand1 = +this.operand1 - +this.operand2;
        break;
      case "*":
        this.operand1 = +this.operand1 * +this.operand2;
        break;
      case "/":
        this.operand1 = +this.operand1 / +this.operand2;
        break;

      default:
        break;
    }
    this.operator = "";
    this.operand2 = 0;
    this.updateUI();
  }
}
const operandElement = document.querySelector("[data-operand-1]");
const operand2Element = document.querySelector("[data-operand-2]");
const clearButton = document.querySelector("[data-clear]");
const numberButtons = document.querySelectorAll("[data-number]");
const deleteButton = document.querySelector("[data-delete]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");

const calculator = new Calculator(operandElement, operand2Element);

clearButton.addEventListener("click", () => {
  calculator.clear();
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerHTML);
  });
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.operation(button.innerHTML);
  });
});

equalsButton.addEventListener("click", () => {
  calculator.calculation();
  saveData();
});

function saveData() {
  localStorage.setItem("operand1", calculator.operand1);
  localStorage.setItem("operand2", calculator.operand2);
  localStorage.setItem("operator", calculator.operator);
}
function showCalc() {
  const savedOperand1 = localStorage.getItem("operand1");
  const savedOperand2 = localStorage.getItem("operand2");
  const savedOperator = localStorage.getItem("operator");

  if (
    savedOperand1 !== null &&
    savedOperand2 !== null &&
    savedOperator !== null
  ) {
    calculator.operand1 = parseFloat(savedOperand1);
    calculator.operand2 = parseFloat(savedOperand2);
    calculator.operator = savedOperator;
    calculator.updateUI();
  }
}
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[0-9.]/.test(key)) {
    calculator.appendNumber(key);
  } else if (key === "+") {
    calculator.operation("+");
  } else if (key === "-") {
    calculator.operation("-");
  } else if (key === "*") {
    calculator.operation("*");
  } else if (key === "/") {
    calculator.operation("/");
  } else if (key === "Enter" || key === "=") {
    calculator.calculation();
    saveData();
  } else if (key === "Escape" || key === "C") {
    calculator.clear();
  } else if (key === "Backspace") {
    calculator.delete();
  }
});
showCalc();
