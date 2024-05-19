
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero is not allowed.";
    }
    return a/b;
}

//operatorler
function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        case "%":
            return (a * b) / 100;
        default:
            return "Error: Invalid operator";
    }
}

//degiskenler
let displayValue = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

//ekran güncelleme
function updateDisplay() {
    display.textContent = displayValue;
}

//rakam girme
function inputDigit(digit){
    if(waitingForSecondOperand){
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === "0" ? digit : displayValue + digit;
    }
    updateDisplay();
}

//ondalık nokta islevi
function inputDecimal(dot) {
    if(waitingForSecondOperand) return;
    if(!displayValue.includes(dot)){
        displayValue += dot;
    }
    updateDisplay();
}

//operator islevi
function handleOperator(nextOperator){
    const inputValue = parseFloat(displayValue);
    if(nextOperator === '%'){
    displayValue = String(percentValue);
    updateDisplay();
    return;
}
if (firstOperand === null){
    firstOperand = inputValue;
} else if (operator){
    const result = operate(operator, firstOperand, inputValue)
    displayValue = String(result);
    firstOperand = result;
}
waitingForSecondOperand = true;
operator = nextOperator;
updateDisplay();
}

//temizleme
function resetCalculator(){
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

//geri alma
function backspace(){
    if (displayValue.length === 1 || displayValue === '-'){
        displayValue = '0';
    }else {
        displayValue = displayValue.slice(0, -1);
    }
    updateDisplay();
}

//buton islev
const keys = document.getElementById('calculator');
keys.addEventListener('click', (event) => {
    const {target} = event;
    if (!target.matches('button')){
        return;
    }

    if(target.classList.contains('number')){
        inputDigit(target.textContent);
    }else if (target.classList.contains('operator')){
        handleOperator(target.textContent);
    }else if (target.id === 'equals'){
        handleEquals();
    }else if (target.id === 'clear'){
        resetCalculator();
    }else if (target.id === 'decimal'){
        inputDecimal(target.textContent);
    }else if (target.id === 'backspace') {
        backspace();
    }
});

//klavye 
document.addEventListener('keydown', (event) => {
    const { key } = event;
    if (/\d/.test(key)) { // Rakam tuşlarına basıldığında
      inputDigit(key);
    } else if (key === '.' || key === ',') { // Ondalık nokta tuşuna basıldığında
      inputDecimal('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') { // Operatör tuşlarına basıldığında
      handleOperator(key);
    } else if (key === 'Enter' || key === '=') { // Eşittir tuşuna basıldığında
      handleEquals();
    } else if (key === 'Escape' || key === 'Delete') { // Temizleme tuşuna basıldığında
      resetCalculator();
    } else if (key === 'Backspace') { // Geri alma tuşuna basıldığında
      if (!isNaN(parseInt(displayValue))) {
        backspace();
      }
    }
  });

  //eşittir
  function handleEquals() {
    if (operator && !waitingForSecondOperand) {
      const inputValue = parseFloat(displayValue);
      const result = operate(operator, firstOperand, inputValue);
      displayValue = String(result);
      firstOperand = result;
      waitingForSecondOperand = true;
      operator = null;
      updateDisplay();
    }
  }
  
  // Ekran referansı (ID'si 'display' olan bir elementin olduğundan emin olun)
  const display = document.getElementById('display');
  updateDisplay();
  