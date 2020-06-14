// Milestone 3

// Features
// Create an input (with number type) element and a button next to that calculates fibonacci.
// Follow this figma design (it is based on bootstrap, so use bootstrap): ITC Fibonacci Project Design  (For this milestone, only the first row of screens is relevant)
// Add a click event listener to the button, that executes a function that takes the number value in the created input, calculates it’s Fibonacci value and presents it to the user
// Recommended googling: ‘HTML Input element’ and ‘get value in javascript of an input element’
// Milestone 3.1 - Geekout

// Features
// Implement the Fibonacci function with recursion
// We know you can google it and copy the code, try doing it by yourself (go over the lectures/youtube if needed)

let x;
let y;
function fibonacciCalc(x) {
  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else if (x > 1) {
    y = fibonacciCalc(x - 1) + fibonacciCalc(x - 2);
    return y;
  } else {
    return "out of scope";
  }
}

//get button callback getButton function once firing the click event
document.getElementById("calculate").addEventListener("click", getButton);

//get x input value
function getButton() {
  let numberX = parseInt(document.getElementById("numX").value);
  let yOutPut = document.getElementById("numY");
  yOutPut.innerText = fibonacciCalc(numberX);
}
