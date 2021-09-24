// global variables
let calculatorDisplay = document.querySelector('div#calculator-display');
let operatorClicked = false;
let firstNum = '';
let prevOperator = '';
const NUM_DECIMALS = 15;

function clear() {
    calculatorDisplay.innerHTML = '0';
    operatorClicked = false;
    firstNum = '';
    prevOperator = '';
}

function displayContainsCharacter(character) {
    let displayText = calculatorDisplay.innerHTML;
    for (let i in displayText) {
        if (calculatorDisplay.innerHTML[i] === character) {
            return true;
        }
    }
    return false;
}


function toggleButtons(isDisabled) {
    for (let number of numbers) {
        number.disabled = isDisabled;
    }
    for (let opr of operators) {
        opr.disabled = isDisabled;
    }
    equal.disabled = isDisabled;
    negationButton.disabled = isDisabled;
    percentButton.disabled = isDisabled;
}

function add(x, y) {
    return x+y;
}

function subtract(x,y) {
    return x-y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        return "Error! Division by 0. Please press Clear to Reset"
    }
    return x/y;
}

function operate(operator, x, y) {

    switch (operator) {
        case '*':
          return multiply(x,y);
        case '/':
          return divide(x,y);
        case '+':
            return add(x,y);
        case '-':
          return subtract(x,y);
        default:
            return NaN;
    }

}

// negation button
const negationButton = document.querySelector('button.calculator-negative');
negationButton.addEventListener('click', () => {
    let currentDisplay = calculatorDisplay.innerHTML;
    if (!(currentDisplay === '0')) {
        calculatorDisplay.innerHTML = String(-1 * parseFloat((+calculatorDisplay.innerHTML).toFixed(NUM_DECIMALS)));
    }
});

// % button
const percentButton = document.querySelector('button.calculator-percentage');
percentButton.addEventListener('click', () => {
    calculatorDisplay.innerHTML = String(parseFloat((calculatorDisplay.innerHTML/100).toFixed(NUM_DECIMALS)));
})

// clear button
const clearButton = document.querySelector('button.calculator-clear');
clearButton.addEventListener('click', () => {
    clear();
    toggleButtons(false);
});

// selecting a number
const numbers = document.querySelectorAll('button.calculator-number');
numbers.forEach((number) => {
  number.addEventListener('click', () => {

    const num = number.innerHTML;
    if (calculatorDisplay.innerHTML === '0' || operatorClicked) {
        calculatorDisplay.innerHTML = num;
        operatorClicked = false;
    }
    else if (calculatorDisplay.innerHTML.length === 9) {
        // limit user entry to 9 digits because thats the almost width of the screen
        return;
    }
    else {

        if (num === '.' && !displayContainsCharacter('.')) {
            calculatorDisplay.innerHTML += num;
        }
        else if (num === '.' && displayContainsCharacter('.')) {
            calculatorDisplay.innerHTML = calculatorDisplay.innerHTML; // do nothing
        }
        else {
            calculatorDisplay.innerHTML += num;
        }
    }

  });
});

// selecting an operator
const operators = document.querySelectorAll('button#calculator-operator');

operators.forEach((operator) => {
    operator.addEventListener('click', () => {

        if (firstNum === '') {
            firstNum = parseFloat(calculatorDisplay.innerHTML);
            prevOperator = operator.innerHTML;
            operatorClicked = true;
        }
        else {
            secondNum = parseFloat(calculatorDisplay.innerHTML);
            let result = operate(prevOperator, firstNum, secondNum);

            firstNum = result;
            if (result === 'Error! Division by 0. Please press Clear to Reset') {
                calculatorDisplay.innerHTML = result;
                toggleButtons(true);
            }
            else {
                calculatorDisplay.innerHTML = String(parseFloat(result.toFixed(NUM_DECIMALS)));
                prevOperator = operator.innerHTML;
                operatorClicked = true;
            }
        }

    });
});

// equals button
const equal = document.querySelector('button#calculator-equals');

equal.addEventListener('click', () => {

    if (prevOperator !== '') {
        secondNum = parseFloat(calculatorDisplay.innerHTML);
        let result = operate(prevOperator, firstNum,secondNum)
        if (result === 'Error! Division by 0. Please press Clear to Reset') {
            calculatorDisplay.innerHTML = result;
            toggleButtons(true);
        }
        else {
            calculatorDisplay.innerHTML = String(parseFloat(result.toFixed(NUM_DECIMALS)));
            firstNum = '';
            prevOperator = '';
            operatorClicked = false;
        }
    }
    else {
        calculatorDisplay.innerHTML = calculatorDisplay.innerHTML;
    }

});
