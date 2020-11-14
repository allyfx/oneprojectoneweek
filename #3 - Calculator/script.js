/**
 * Variables!
 */
let calc = [];
let currentNumber = document.getElementById('current');
let previousNumber = document.getElementById('previous');
let numButtons = document.querySelectorAll('button.num');
let operatorsButtons = document.querySelectorAll('button.operator');

/**
 * Number Buttons
 */
numButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
        if (currentNumber.innerText === '0') {
            currentNumber.innerText = btn.innerText;
        } else if(currentNumber.innerText.length < 10) {
            currentNumber.innerText += btn.innerText;
        }
    });
});

/**
 * Operator Buttons
 */
operatorsButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
        if (btn.innerText === ',') {
            currentNumber.innerText += '.';
            return;
        }

        if (btn.innerText === '%') {
            currentNumber.innerText = Number(currentNumber.innerText) / 100;
            return;
        }

        if (btn.innerText === 'CE') {
            currentNumber.innerText = '0';
            return;
        }

        if (btn.innerText === 'C') {
            currentNumber.innerText = '0';
            previousNumber.innerText = '';
            calc = [];
            return;
        }

        addOperator(btn.innerText);
    });
});

/**
 * Add number to previous numbers
 * If operator is '=' it calculate the total
 */
function addOperator(operator) {
    calc.push(Number(currentNumber.innerText));
    
    /**
     * In case the last value is '=' it clean the previous value and
     * display the next calc
     */
    if(previousNumber.innerText.charAt([previousNumber.innerText.length -1]) === "=" & currentNumber.innerText.length > 0) {
        previousNumber.innerText = ` ${currentNumber.innerText} ${operator}`;
    } else {
        previousNumber.innerText += ` ${currentNumber.innerText} ${operator}`;
    }

    currentNumber.innerText = '0';

    if (operator === "=") {
        calcResult();
        return;
    }

    calc.push(operator);
}

/**
 * Function to calculate the total
 */
function calcResult() {
    let operator = null;
    let current = null;

    let total = null;

    /**
     * In case the last value in calc is not a number
     * it is removed
     */
    if (isNaN(calc[calc.length - 1])) {
        calc.pop()
    }

    /**
     * In case there is only one number or value on calc
     * it is removed and the function does not execute
     */
    if (calc.length === 1) {
        previousNumber.innerText = '';
        calc = [];
        return;
    }

    /**
     * For each value in calc we calculate the result
     */
    calc.forEach(num => {
        if (!isNaN(num)) {
            if (current === null) {
                current = num;
            } else {
                if(total !== null) {
                    total = calcOperation(operator, total, num);
                } else {
                    total = calcOperation(operator, current, num);
                }
            }
        } else {
            operator = num;
        }
    });

    /**
     * Update the html viewer and reset calc
     */
    currentNumber.innerText = total.toString();
    calc = [];
}

/**
 * Function to calculate the values
 */
function calcOperation(operator, num1, num2) {
    switch(operator) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "x": return num1 * num2;
        case "/": return num1 / num2;
    }
}