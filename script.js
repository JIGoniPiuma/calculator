function determineOperator(displayValue, inputValue) {
  if (displayValue === "-" && inputValue === "-") {
    let resultOperator = "+";
    return resultOperator;
  } else if (displayValue === "+" && inputValue === "-") {
    let resultOperator = "-";
    return resultOperator;
  } else if (displayValue === "-" && inputValue === "+") {
    let resultOperator = "-";
    return resultOperator;
  } else if (displayValue === "+" && inputValue === "+") {
    let resultOperator = "+";
    return resultOperator;
  } else if (displayValue === "+" && inputValue === "/") {
    let resultOperator = "/";
    return resultOperator;
  } else if (displayValue === "+" && inputValue === "*") {
    let resultOperator = "*";
    return resultOperator;
  } else if (displayValue === "-" && inputValue === "/") {
    let resultOperator = "/";
    return resultOperator;
  } else if (displayValue === "-" && inputValue === "*") {
    let resultOperator = "*";
    return resultOperator;
  } else if (displayValue === "/" && inputValue === "+") {
    let resultOperator = "/";
    return resultOperator;
  } else if (displayValue === "/" && inputValue === "-") {
    // CASO ESPECIAL
    let resultOperator = "/-";
    return resultOperator;
  } else if (displayValue === "/" && inputValue === "/") {
    let resultOperator = "/";
    return resultOperator;
  } else if (displayValue === "/" && inputValue === "*") {
    let resultOperator = "*";
    return resultOperator;
  } else if (displayValue === "*" && inputValue === "+") {
    let resultOperator = "+";
    return resultOperator;
  } else if (displayValue === "*" && inputValue === "-") {
    // CASO ESPECIAL
    let resultOperator = "*-";
    return resultOperator;
  } else if (displayValue === "*" && inputValue === "/") {
    let resultOperator = "/";
    return resultOperator;
  } else if (displayValue === "*" && inputValue === "*") {
    let resultOperator = "*";
    return resultOperator;
  } else if (displayValue === "%" && inputValue === "+") {
    let resultOperator = "+";
    return resultOperator;
  } else if (displayValue === "%" && inputValue === "-") {
    let resultOperator = "-";
    return resultOperator;
  } else if (displayValue === "%" && inputValue === "*") {
    let resultOperator = "*";
    return resultOperator;
  } else if (displayValue === "%" && inputValue === "/") {
    let resultOperator = "/";
    return resultOperator;
  } else if (displayValue === "+" && inputValue === "%") {
    let resultOperator = "%";
    return resultOperator;
  } else if (displayValue === "-" && inputValue === "%") {
    let resultOperator = "-%"; //CASO ESPECIAL
    return resultOperator;
  } else if (displayValue === "*" && inputValue === "%") {
    let resultOperator = "%";
    return resultOperator;
  } else if (displayValue === "/" && inputValue === "%") {
    let resultOperator = "%";
    return resultOperator;
  } else if (displayValue === "%" && inputValue === "%") {
    let resultOperator = "%";
    return resultOperator;
  }
}
function isOperator(input) {
  return (
    input === "+" ||
    input === "-" ||
    input === "*" ||
    input === "/" ||
    input === "%" ||
    input === "+/-"
  );
}

function operate(arr) {
  let result = 0; // Empezamos con 0, por defecto.

  if (isOperator(arr[0])) {
    //Inicializo result dependiendo de si es un num u operator, y de que operator es.
    if (arr[0] === "-") {
      arr[1] = -arr[1];
      result = arr[1];
      arr.splice(0, 1);
    } else if (arr[0] === "+") {
      result = arr[1];
      arr.splice(0, 1);
    } else if (arr[0] === "*" || arr[0] === "/" || arr[0] === "%") {
      result = 0;
    }
  } else {
    result = arr[0];
  }

  for (let i = 1; i < arr.length; i++) {
    let operator = arr[i];
    let nextValue = arr[i + 1];
    let previousValue = arr[i - 1];

    if (operator === "*" || operator === "/" || operator === "%") {
      if (operator === "*") {
        result *= nextValue;
      } else if (operator === "/") {
        result /= nextValue;
      } else {
        result = previousValue / 100;
        arr.splice(0, 1);
        arr.splice(0, 1);
        arr.unshift(result);
      }
      i++;
    }
  }

  for (let i = 1; i < arr.length; i++) {
    let operator = arr[i];
    let nextValue = arr[i + 1];

    if (operator === "+") {
      result += nextValue;
    } else if (operator === "-") {
      result -= nextValue;
    }
    i++;
  }

  console.log(result);
  return parseFloat(result.toFixed(11));
}

let buttons = document.querySelectorAll("button");
let display = document.querySelector(".display");
let arrOperation = [];
display.textContent = "0";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let input = button.textContent;

    if (display.textContent === "0" || display.textContent === "") {
      // If display IS EMPTY

      if (!isNaN(input)) {
        // If DISPLAY is EMPTY AND input is number

        arrOperation.push(parseInt(input));
        display.textContent = input;
      }
      if (isNaN(input)) {
        // AND input IS NOT a number
        if (input === "AC") {
          arrOperation = [];
          display.textContent = "0";
        } else if (isOperator(input)) {
          arrOperation.push(input);
          display.textContent = input;
        } else if (input === "=") {
          display.textContent = "0";
          let result = operate(arrOperation);
          display.textContent = result;
          arrOperation = [result];
        } else if (input === "%") {
          // VERIFICAR SI ESTO VA ACA
          arrOperation = [];
          display.textContent = "%";
        }
      }
    } else {
      // SI HAY ALGO EN LA PANTALLA
      if (!isNaN(display.textContent)) {
        // SI HAY UN NUMERO EN LA PANTALLA
        if (!isNaN(input)) {
          // SI HAY UN NUMERO EN LA PANTALLA Y EL INPUT ES UN NUMERO
          let lastElement = arrOperation.pop();
          let concat = lastElement + input;
          arrOperation.push(parseInt(concat));
          display.textContent = concat;
        } else {
          // SI HAY UN NUMERO EN LA PANTALLA Y EL INPUT NO ES NUMERO
          if (input === "AC") {
            arrOperation = [];
            display.textContent = "0";
          } else if (isOperator(input)) {
            arrOperation.push(input);
            display.textContent = input;
            console.log(arrOperation);
          } else if (input === "=") {
            display.textContent = input;
            let result = operate(arrOperation);
            display.textContent = result;
            arrOperation = [result];
            return;
          } else if (input === "%") {
            display.textContent = input;
            let result = operate(arrOperation);
            display.textContent = result;
            arrOperation = [result];
            return;
          }
        }
      } else {
        // Si hay un NO NUMERO en la PANTALLA
        if (!isNaN(input)) {
          //Si hay un NO NUMERO en la PANTALLA y el INPUT ES NUMERO.
          display.textContent = input;
          arrOperation.push(parseInt(input));
        } else {
          //Si hay un NO NUMERO en la PANTALLA y el Input es NO NUMERO.
          if (input === "AC") {
            arrOperation = [];
            display.textContent = "0";
          } else if (isOperator(input)) {
            let resultOperator = determineOperator(display.textContent, input);

            if (resultOperator === "*-") {
              let auxOperand = -1;
              let secondOperand = "*";
              arrOperation.push(auxOperand);
              arrOperation.push(secondOperand);
              console.log(arrOperation);
            } else if (resultOperator === "/-") {
              let auxOperand = -1;
              let secondOperand = "/";
              arrOperation.push(auxOperand);
              arrOperation.push(secondOperand);
            } else if (resultOperator === "-%") {
              arrOperation = [];
              display.textContent = "Error";
            } else {
              arrOperation.pop();
              arrOperation.push(resultOperator);
              console.log(resultOperator);
              console.log(arrOperation);
            }
          } else if (input === "=") {
            display.textContent = input;
            let result = operate(arrOperation);
            display.textContent = result;
            arrOperation = [result];
            return;
          }
        }
      }
    }
  });
});
