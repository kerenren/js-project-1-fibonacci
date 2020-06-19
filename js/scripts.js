let loader = document.getElementById("loader");
let loader2 = document.getElementById("loader2");
let errorBox = document.getElementById("error");
let calBtn = document.getElementById("calculate");
let errorMsg = document.getElementById("error-msg");
let result = document.getElementById("result");
let loadURL = "http://localhost:5050/getFibonacciResults";
let numberFib = document.getElementById("inputNum");
let yOutPut = document.getElementById("resultNum");
let saveResult = document.getElementById("defaultCheck1");
let selectSort = document.getElementById("selectSort");

function present(selector) {
  selector.classList.remove("d-none");
}

function unpresent(selector) {
  selector.classList.add("d-none");
}

function pushList(inputNumber, calResult, calTime) {
  let li = document.createElement("li");
  li.classList.add("border-bottom", "mb-3", "border-dark", "d-block", "pb-3");
  li.innerHTML = `The Fibonacci of <b>${inputNumber}</b> is <b>${calResult}</b>. Calculated at ${calTime}`;
  result.prepend(li);
}

async function handleSortMethod() {
  const response = await fetch(loadURL);
  const data = await (async () => await response.json())();
  let list = data.results;
  sortResults(selectSort.value, list);
  addResults(list);
  return list;
}

function sortType() {
  selectSort.addEventListener("change", handleSortMethod);
}

function sortResults(sortValue, array) {
  switch (sortValue) {
    case "numAsc":
      array.sort((a, b) => (a.number < b.number ? 1 : -1));
      break;
    case "numDesc":
      array.sort((a, b) => (a.number > b.number ? 1 : -1));
      break;
    case "dateAsc":
      array.sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1));
      break;
    case "dateDesc":
      array.sort((a, b) => (a.createdDate > b.createdDate ? 1 : -1));
      break;
    default:
      alert("the sorting type is required");
  }
}

function addResults(array) {
  for (let i = 0; i < array.length; i++) {
    let arrayFib = array[i];
    pushList(arrayFib.number, arrayFib.result, new Date(arrayFib.createdDate));
  }
}

async function handleResultData() {
  const response = await fetch(loadURL);
  const data = await (async () => await response.json())();
  let resultArray = data.results;
  addResults(resultArray);
  return resultArray;
}

function loadResults() {
  handleResultData();
}

function highlightError() {
  numberFib.classList.add("error-input");
  present(errorBox);
  yOutPut.innerText = "";
}

function removeError() {
  numberFib.classList.remove("error-input");
  unpresent(errorMsg);
  unpresent(errorBox);
}

function handleError() {
  highlightError();
  present(errorMsg);
  unpresent(errorBox);
  unpresent(loader);
  unpresent(loader2);
}

function presentLoader() {
  present(loader);
  present(loader2);
}

function unpresentLoader() {
  unpresent(loader);
  unpresent(loader2);
}

async function serverCalc() {
  let itcServer = `http://localhost:5050/fibonacci/${numberFib.value}`; //selfnote: the varaible itcserver has to be decalred inside serveCalc(), so that the numberFib will be updated by every click.

  let newResult = {
    text: numberFib.value,
    dateCreated: new Date(),
  };

  yOutPut.innerText = "";

  if (parseInt(numberFib.value) > 50) {
    highlightError();
    errorBox.innerText = "Can't be larger than 50";
  } else if (numberFib.value === "") {
    errorMsg.innerText = "number can't be smaller than 1";
    handleError();
  } else {
    presentLoader();
    const response = await fetch(itcServer);
    if (!response.ok) {
      handleError();
      const error = await response.text();
      errorMsg.innerText = error;
    } else {
      numberFib.classList.remove("error-input");
      const data = await response.json();
      yOutPut.innerText = data.result;
      pushList(newResult.text, data.result, newResult.dateCreated);
    }
    unpresentLoader();
  }
}

function checkNumberIsValid(num) {
  if (numberFib.value === "" || numberFib.value === "0") {
    errorMsg.innerText = "number can't be smaller than 1";
    handleError();
    return false;
  } else if (num === 42) {
    errorMsg.innerText = "42 is the meaning of life";
    handleError();
    return false;
  } else if (num > 50) {
    errorBox.innerText = "Can't be larger than 50";
    highlightError();
    return false;
  } else {
    return true;
  }
}

function fiboLoop(num) {
  if (num === 0) return 0;
  if (num < 2) return 1;
  let start = 0;
  let next = 1;
  let sum;
  for (let i = 2; i <= num; i++) {
    sum = start + next;
    start = next;
    next = sum;
  }
  return sum;
}

function localCalc() {
  let inputNum = parseInt(numberFib.value);
  if (checkNumberIsValid(inputNum)) {
    fiboLoop(inputNum);
    yOutPut.innerText = fiboLoop(inputNum);
    pushList(numberFib.value, yOutPut.innerText, new Date());
  } else {
    yOutPut.innerText = "";
    console.log("Number should be between 0 and 50");
  }
}

loadResults();
sortType();

function calcButton() {
  removeError(); // selfnote: in order to remove error every time after click this function should be kept inside calcButton().
  if (saveResult.checked) {
    serverCalc();
  } else {
    localCalc();
  }
}

calBtn.addEventListener("click", calcButton);
