var numA = parseFloat(prompt("Ingrese el primer numero: "));

var numB = parseFloat(prompt("Ingrese el segundo numero: "));

var operation = prompt("Ingrese la operacion (+,-,*,/): ");

var result;
switch(operation) {
    case "+":
        result = numA + numB;
        break;
    case "-":
        result = numA - numB;
        break;
    case "*":
        result = numA * numB;
        break;
    case "/":
        result = numA / numB;
        break;
    default:
        alert("Por favor, solo utilizar caracteres: +,-,*,/");
}

/* Codigo con if / else
if (operation === "+") {
    result = numA + numB;
} else if (operation === "-") {
    result = numA - numB;
} else if (operation === "*") {
    result = numA * numB;
} else if (operation === "/") {
    result = numA / numB;
} else {
    alert("Por favor, solo utilizar caracteres: +,-,*,/")
}
*/

if (result !== undefined) {
    var resultStr = numA + " " + operation + " " + numB + " = " + result;
    alert(resultStr);
    console.log(resultStr);
}