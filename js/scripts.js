//  Features
// Instead of hardcoding Y (the result of the Fibonacci of X), calculate it with a for loop
// The calculation should be wrapped in a function, that gets X as an argument, and returns Y
// After the function, you should call the function, and assign the returned value in you HTML to present to the user

let x = 5;
let y;

function fibonacciCalc(x) {
  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    y = fibonacciCalc(x - 1) + fibonacciCalc(x - 2);
    return y;
  }
}

let xOutPut = document.getElementById("numX");
let yOutPut = document.getElementById("numY");
xOutPut.innerText = x;
yOutPut.innerText = fibonacciCalc(x);
