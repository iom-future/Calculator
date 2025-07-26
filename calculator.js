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
let input = prompt("What ya wanna calculate (separate values by space)");
let value = input.split(" ");
let converted = value.map((item, index) => {
  return index % 2 === 0 ? Number(item) : item;
});
//MAIN CALCULATOR
//let arrayOfNumberAndOperator = [2,"/",2,"-",6,"-",3,"+",100,"-",3,"+",4,"="];
function calculator(numAndOperator) {
  let isRunning = true;
  while (isRunning) {
    let isThereExponential = numAndOperator.includes("^");
    let isThereDivision = numAndOperator.includes("/");
    let isThereMultiplication = numAndOperator.includes("*");
    let isThereAddition = numAndOperator.includes("+");
    let isThereSubtraction = numAndOperator.includes("-");
    if (isThereExponential) {
      let resultOfExponential = exponential(
          numAndOperator[numAndOperator.indexOf("^") - 1],
          numAndOperator[numAndOperator.indexOf("^") + 1]);
      let startCount = numAndOperator.indexOf("^") - 1;
      numAndOperator.splice(startCount, 3, resultOfExponential);
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
      //remove the negative sign and add a positive
      // numAndOperator[1]="+";
      //let startCount2 = numAndOperator.indexOf("-")

    } else if (isThereSubtraction) {
      let resultOfSubtraction = subtraction(
          numAndOperator[numAndOperator.indexOf("-") - 1],
          numAndOperator[numAndOperator.indexOf("-") + 1]);
      let startCount = numAndOperator.indexOf("-") - 1;
      numAndOperator.splice(startCount, 3, resultOfSubtraction);
    } else {
      isRunning = false;
      numAndOperator.pop();
    }

  }
  return numAndOperator;
}

console.log(calculator(converted));
//i am using git tor track changes in this file