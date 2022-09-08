class Calculator {
    constructor(previousDisplayTextElement, currentDisplayTextElement) {
      this.previousDisplayTextElement = previousDisplayTextElement;
      this.currentDisplayTextElement = currentDisplayTextElement;
      this.clear();
    }
  
    clear() {
      this.currentDisplay = "";
      this.previousDisplay = "";
      this.error = "";
      this.operation = undefined;
    }
  
    delete() {
      // in case of error
      if (this.error) {
        this.clear();
      }
  
      this.currentDisplay = this.currentDisplay.toString().slice(0, -1);
    }
  
    appendNumber(number) {
      // in case of error
      if (this.error) {
        this.clear();
      }
  
      // Allowing only 1 decimal point
      if (number === "." && this.currentDisplay.includes(".")) return;
  
      this.currentDisplay = this.currentDisplay.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      // in case of error
      if (this.error) {
        this.clear();
      }
  
      if (this.currentDisplay === "") return;
      if (this.previousDisplay !== "") {
        this.calculate();
      }
  
      this.operation = operation;
      this.previousDisplay = this.currentDisplay;
      this.currentDisplay = "";
    }
  
    calculate() {
      // in case of error
      if (this.error) {
        this.clear();
      }
  
      let calculation;
      const prev = parseFloat(this.previousDisplay);
      const current = parseFloat(this.currentDisplay);
  
      // stop function if prev/curent value is not number
      if (isNaN(prev) || isNaN(current)) return;
  
      switch (this.operation) {
        case "+":
          calculation = prev + current;
          break;
        case "-":
          calculation = prev - current;
          break;
        case "×":
          calculation = prev * current;
          break;
        case "÷":
          if (current <= 0) {
            if (current === 0) this.error = "You Broke Me.";
            return;
          } else {
            calculation = prev / current;
          }
          break;
        default:
          return;
      }
  
      // display result
      this.currentDisplay = calculation.toString();
      // reset values after calculation
      this.operation = undefined;
      this.previousDisplay = "";
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split(".")[0]); // convert to array
      const decimalDigits = stringNumber.split(".")[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = "";
      } else {
        integerDisplay = integerDigits.toLocaleString("en", {
          maximumFractionDigits: 0,
        });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  
    updateDisplay() {
      // in case of error
      if (this.error) {
        this.currentDisplayTextElement.innerText = this.error;
        return;
      }
  
      this.currentDisplayTextElement.innerText = this.getDisplayNumber(
        this.currentDisplay
      );
      if (this.operation != null) {
        this.previousDisplayTextElement.innerText = `${this.getDisplayNumber(
          this.previousDisplay
        )} ${this.operation}`;
      } else {
        this.previousDisplayTextElement.innerText = "";
      }
    }
  }
  
  const numberButtons = document.querySelectorAll("[data-number]");
  const operationButtons = document.querySelectorAll("[data-operation]");
  const equalsButton = document.querySelector("[data-equals]");
  const deleteButton = document.querySelector("[data-delete]");
  const allClearButton = document.querySelector("[data-all-clear]");
  const previousDisplayTextElement = document.querySelector(
    "[data-previous-display]"
  );
  const currentDisplayTextElement = document.querySelector(
    "[data-current-display]"
  );
  
  const calculator = new Calculator(
    previousDisplayTextElement,
    currentDisplayTextElement
  );
  
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
  
  equalsButton.addEventListener("click", (event) => {
    calculator.calculate();
    calculator.updateDisplay();
  });
  
  allClearButton.addEventListener("click", (event) => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  deleteButton.addEventListener("click", (event) => {
    calculator.delete();
    calculator.updateDisplay();
  });
  