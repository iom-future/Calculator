const readline = require('readline'); // tool to talk to user

// math tools
function exponential(num1, num2) { return num1 ** num2; }
function division(num1, num2) { return num1 / num2; }
function multiplication(num1, num2) { return num1 * num2; }
function addition(num1, num2) { return num1 + num2; }
function subtraction(num1, num2) { return num1 - num2; }

// start chat with user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ask the user for a math problem
rl.question('Enter a calculation with values seperated by space(e.g. 2 + 3 * 2 =): ', (userInput) => {
    let value = userInput.split(" "); // break input into characters
    let converted = value.map((item, index) => {
        return index % 2 === 0 ? Number(item) : item; // turn every 1st, 3rd, 5th, etc. into numbers
    });

    // main calculator function
    function calculator(numAndOperator) {
        let isRunning = true;

        while (isRunning) {
            let isThereExponential = numAndOperator.includes("^");
            let isThereDivision = numAndOperator.includes("/");
            let isThereMultiplication = numAndOperator.includes("*");
            let isThereAddition = numAndOperator.includes("+");
            let isThereSubtraction = numAndOperator.includes("-");

            if (isThereExponential) {
                let result = exponential(
                    numAndOperator[numAndOperator.indexOf("^") - 1],
                    numAndOperator[numAndOperator.indexOf("^") + 1]
                );
                let i = numAndOperator.indexOf("^") - 1;
                numAndOperator.splice(i, 3, result);
            } else if (isThereDivision) {
                let result = division(
                    numAndOperator[numAndOperator.indexOf("/") - 1],
                    numAndOperator[numAndOperator.indexOf("/") + 1]
                );
                let i = numAndOperator.indexOf("/") - 1;
                numAndOperator.splice(i, 3, result);
            } else if (isThereMultiplication) {
                let result = multiplication(
                    numAndOperator[numAndOperator.indexOf("*") - 1],
                    numAndOperator[numAndOperator.indexOf("*") + 1]
                );
                let i = numAndOperator.indexOf("*") - 1;
                numAndOperator.splice(i, 3, result);
            } else if (isThereAddition) {
                let result = addition(
                    numAndOperator[numAndOperator.indexOf("+") - 1],
                    numAndOperator[numAndOperator.indexOf("+") + 1]
                );
                let i = numAndOperator.indexOf("+") - 1;
                numAndOperator.splice(i, 3, result);
            } else if (isThereSubtraction) {
                let result = subtraction(
                    numAndOperator[numAndOperator.indexOf("-") - 1],
                    numAndOperator[numAndOperator.indexOf("-") + 1]
                );
                let i = numAndOperator.indexOf("-") - 1;
                numAndOperator.splice(i, 3, result);
            } else {
                isRunning = false; // no more operators → done!
                numAndOperator.pop(); // remove "="
            }
        }

        return numAndOperator; // return the final result
    }

    // show the final answer to the user
    console.log(`Your final answer is: ${calculator(converted)}`);
    rl.close(); // done listening
});

