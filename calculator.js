//created a function for each maths operation
function exponential(num1, num2) {
  return num1 ** num2;
}

function division(num1, num2) {
  return num1 / num2;
}

function multiplication(num1, num2) {
  return num1 * num2;
}

function addition(num1, num2) {
  return num1 + num2;
}

function subtraction(num1, num2) {
  return num1 - num2;
}

//TAKE USER INPUT
//making it more interactive
let input = prompt("What do you want to calculate (separate values by space and end with an equal sign)");
let value = input.split(" ");
let converted = value.map((item, index) => {
  return index % 2 === 0 ? Number(item) : item;
});
//if you're running in node.js pass argument in the format below,
//let arrayOfNumberAndOperator = [2,"/",2,"-",6,"-",3,"+",100,"-",3,"+",4,"="];

//MAIN CALCULATOR
function calculator(numAndOperator) {
  let isRunning = true;
  while (isRunning) {
    //checking if there is an operation allows me to achieve operation precedence as in a real calculator
    let isThereExponential = numAndOperator.includes("^");
    let isThereDivision = numAndOperator.includes("/");
    let isThereMultiplication = numAndOperator.includes("*");
    let isThereAddition = numAndOperator.includes("+");
    let isThereSubtraction = numAndOperator.includes("-");
    //organized the 'if' and 'else if' condition to achieve operational precedence
    if (isThereExponential) {
     // numAndOperator[numAndOperator.indexOf("^") - 1] --> get the operand before the '^' operator
      // numAndOperator[numAndOperator.indexOf("^") + 1]; --> gets the operand after the '^' operator
      let resultOfExponential = exponential(numAndOperator[numAndOperator.indexOf("^") - 1],
          numAndOperator[numAndOperator.indexOf("^") + 1]);
      let startCount = numAndOperator.indexOf("^") - 1;
      numAndOperator.splice(startCount, 3, resultOfExponential);//replaces the expression with the final result(after calculation);4 replaces 2^2
    } else if (isThereDivision) {
      let resultOfDivision = division(
          numAndOperator[numAndOperator.indexOf("/") - 1],
          numAndOperator[numAndOperator.indexOf("/") + 1]);
      let startCount = numAndOperator.indexOf("/") - 1;
      numAndOperator.splice(startCount, 3, resultOfDivision);
    } else if (isThereMultiplication) {
      let resultOfMultiplication = multiplication(
          numAndOperator[numAndOperator.indexOf("*") - 1],
          numAndOperator[numAndOperator.indexOf("*") + 1]);
      let startCount = numAndOperator.indexOf("*") - 1;
      numAndOperator.splice(startCount, 3, resultOfMultiplication);
    } else if (isThereAddition) {
      //the if statement below tackles the common maths problem of :
      //-5+3 === 3-5 =-2
      let parameter1;
      if (numAndOperator[numAndOperator.indexOf("+") - 2] === "-") {
        parameter1 = -(numAndOperator[numAndOperator.indexOf("+") - 1]);
        let resultOfAddition = addition(parameter1,
            numAndOperator[numAndOperator.indexOf("+") + 1]);
        let startCount = numAndOperator.indexOf("+") - 1;
        numAndOperator.splice(startCount, 3, resultOfAddition);
        //remove the negative sign and add a positive
          if (numAndOperator[numAndOperator.indexOf("+") - 1] >
              numAndOperator[numAndOperator.indexOf("+") + 1]) {
            let startCount = numAndOperator.indexOf(resultOfAddition) - 1;
            numAndOperator.splice(startCount, 1, "-");
          } else {
            let startCount = numAndOperator.indexOf(resultOfAddition) - 1;
            numAndOperator.splice(startCount, 1, "+");
          }
      } else {
        let resultOfAddition = addition(
            numAndOperator[numAndOperator.indexOf("+") - 1],
            numAndOperator[numAndOperator.indexOf("+") + 1]);
        let startCount = numAndOperator.indexOf("+") - 1;
        numAndOperator.splice(startCount, 3, resultOfAddition);
      }


    } else if (isThereSubtraction) {
      let resultOfSubtraction = subtraction(
          numAndOperator[numAndOperator.indexOf("-") - 1],
          numAndOperator[numAndOperator.indexOf("-") + 1]);
      let startCount = numAndOperator.indexOf("-") - 1;
      numAndOperator.splice(startCount, 3, resultOfSubtraction);
    } else {
      isRunning = false;
      numAndOperator.pop();//removes the equal sign after you have gotten the final result;[20,=]-->[20]
    }

  }
  return numAndOperator;
}

console.log(`your final answer is: ${calculator(converted)}`);
