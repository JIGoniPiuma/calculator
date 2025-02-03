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
  }
}
function isOperator(input) {
  return input === "+" || input === "-" || input === "*" || input === "/";
}

function operate(arr) {
  let result = 0; // Empezamos con 0, por defecto.

  // Verificamos si el primer elemento es un operador
  if (isOperator(arr[0])) {
    // Si el primer operador es '-', lo aplicamos al siguiente número
    if (arr[0] === "-") {
      result = -arr[1]; // Convertimos el siguiente número en negativo
    } else if (arr[0] === "+") {
      result = arr[1]; // Si el primer operador es +, usamos el siguiente número
    } else if (arr[0] === "*" || arr[0] === "/") {
      result = 0; // Si el primer operador es * o /, inicializamos el resultado a 0
    }
  } else {
    result = arr[0]; // Si el primer valor no es un operador, lo usamos directamente
  }

  // Primero, resolvemos * y /
  for (let i = 1; i < arr.length; i++) {
    let operator = arr[i]; // El operador (como * o /)
    let nextValue = arr[i + 1]; // El siguiente valor numérico

    // Verificamos si el operador es * o /
    if (operator === "*" || operator === "/") {
      // Realizamos la operación
      if (operator === "*") {
        result *= nextValue; // Multiplicamos el resultado por el siguiente valor
      } else if (operator === "/") {
        result /= nextValue; // Dividimos el resultado por el siguiente valor
      }
      i++; // Incrementamos el índice extra porque ya procesamos el siguiente número
    }
  }

  // Ahora procesamos las sumas y restas (+ y -)
  for (let i = 1; i < arr.length; i++) {
    let operator = arr[i]; // El operador (+ o -)
    let nextValue = arr[i + 1]; // El siguiente valor numérico

    // Verificamos si el operador es + o -
    if (operator === "+") {
      result += nextValue; // Sumamos el siguiente valor
    } else if (operator === "-") {
      result -= nextValue; // Restamos el siguiente valor
    }
    i++; // Incrementamos el índice extra porque ya procesamos el siguiente número
  }

  // Devolver el resultado final
  console.log(result);
  return result;
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
        // AND input is number
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
          let result = operate(arrOperation); // NO VA DIRECTAMENTE CERO>? SI DISPLAY ESTA VACIO Y pongo un operador deberia ser 0
          display.textContent = result;
          arrOperation = [result];
          return;
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
            display.textContent = 0;
          } else if (isOperator(input)) {
            arrOperation.push(input);
            display.textContent = input;
          } else if (input === "=") {
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
            display.textContent = 0;
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
            } else {
              arrOperation.push(resultOperator);
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

//     //display.textContent = input;

//     if (isNaN(parseInt(input))) {
//       if (input === "=") {
//         let cleanedArr = cleanInput(arrOperation);
//         let result = calculate(cleanedArr);
//         display.textContent = result;
//       } else if (input === "AC") {
//         arrOperation = [];
//         display.textContent = 0;
//       } else {
//         arrOperation.push(input);
//         display.textContent = input;
//       } // agregar las teclas que faltan ( %% simbolo de negativad)
//     } else {
//       arrOperation.push(parseInt(input));
//       display.textContent = input;
//     }

//     return arrOperation;
//   });
// });
