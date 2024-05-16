var firstNum = "";
var secondNum = "";
var operator = "";
var isOperator = false;
var result = null;
var forbiddenOperation = false;

const currDisplay = document.querySelector(".current");
const prevSelection = document.querySelector(".prev");
const button = document.querySelectorAll("button");

button.forEach(btn => {
    btn.addEventListener("click", getUserInput);
});

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

const add = function (a, b) {
    return roundResult(a + b);
}

const subtract = function(a, b) {
    return roundResult(a - b);
}

const multiply = function(a, b) {
    return roundResult(a * b);
}

const divide = function(a, b) {
    if (b == 0) {
        window.alert("Dividing by 0 is not possible!");
        forbiddenOperation = true;
        secondNum = "";
        return;
    }
    return roundResult(a / b);
}

const operate = function(operator, firstNum, secondNum) {
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);

    switch(operator) {
        case "+":
        case "add-button":
            return add(firstNum,secondNum);
        case "-":
        case "minus-button":
            return subtract(firstNum,secondNum);
        case "*":
        case "multiply-button":
            return multiply(firstNum,secondNum);
        case "/":
        case "divide-button":
            return divide(firstNum,secondNum);
        default:
            throw new Error(`Unsupported operator: ${operator}`);
    }
}

const clearInput = function(clearBtn = false) {
    firstNum = clearBtn ? "" : (result ? result : "");
    isOperator = false;
    secondNum = "";
    operator = "";
    prevSelection.textContent = "";
}

const operationScreen = function(equalBtn = false) {
    //operator string conversion
    var symbol = "";

    switch(operator) {
        case "add-button":
            symbol = "+";
            break;
        case "minus-button":
            symbol = "-";
            break;
        case "multiply-button":
            symbol = "x";
            break;
        case "divide-button":
            symbol = "÷"
            break;
    }
    
    prevSelection.textContent = equalBtn ? (`${firstNum} ${symbol} ${secondNum} =`) : (`${firstNum} ${symbol}`);
}

function getUserInput(event) {
    const userInput = event.target.id;
    if (userInput == 'clear-button') {
        clearInput(true);
        currDisplay.textContent = 0;
    }
    if (userInput == 'delete-button') {
        if (!isOperator) {
            firstNum = firstNum.slice(0,-1);
            currDisplay.textContent = firstNum;
        }
        else {
            secondNum = secondNum.slice(0,-1);
            currDisplay.textContent = secondNum;
        }
    }
    if (userInput == 'float-button') {
        if (!isOperator) {
            if (firstNum.includes('.')) return;
            if (!firstNum) firstNum = 0;
            firstNum += '.';
            currDisplay.textContent = firstNum;
        }
        else {
            if (secondNum.includes('.')) return;
            if (!secondNum) secondNum = 0;
            secondNum += ".";
            currDisplay.textContent = secondNum;
        }
    }
    else if (!userInput.includes('button') && !isOperator) {
        firstNum += userInput;
        currDisplay.textContent = firstNum;
    }
    else if (userInput.includes('button') && !isOperator) {
        if (!userInput.includes('equal') && !userInput.includes('float') && !userInput.includes('clear') && !userInput.includes('delete')) {
            operator = userInput;
            isOperator = true;
            operationScreen();
        }
    }
    else if (!userInput.includes('button') && isOperator) {
        forbiddenOperation = false;
        secondNum += userInput;
        currDisplay.textContent = secondNum;
        operationScreen();
        result = operate(operator, firstNum, secondNum);
    }
    else if (userInput == 'equal-button') {
        if (forbiddenOperation) {
            window.alert("Dividing by 0 is not possible!");
            operationScreen();
            return;
        }
        if (result == null) {
            result = operate(operator, firstNum, secondNum);
        }
        currDisplay.textContent = result;
        operationScreen(true);
    }
    else if (userInput.includes('button') && isOperator) {
        if (!userInput.includes('equal') && !userInput.includes('float') && !userInput.includes('clear') && !userInput.includes('delete')) {
            clearInput();
            operator = userInput;
            isOperator = true;
            currDisplay.textContent = result;
            operationScreen();
        }
    }
}




