(() => {
  //TL;DR to do: 1. fix the select latency issue in Chrome (the select behavior in FireFox is good) 2.add local calc number conditions 3. select button design  4. clean codes with the variable storage method  5. resolve questions in comments 6. resolve the Response.json() Boday has already been consumed error in number 42 case(server calc)

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
    const data = await response.json();
    let list = data.results;
    sortResults(selectSort.value, list);
    addResults(list);
    return list;
  }

  function sortType() {
    selectSort.addEventListener("click", handleSortMethod);
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
        console.log("the sort type is required");
    }
  }

  function addResults(array) {
    for (let i = 0; i < array.length; i++) {
      let arrayFib = array[i];
      pushList(
        arrayFib.number,
        arrayFib.result,
        new Date(arrayFib.createdDate)
      );
    }
  }

  async function handleResultData() {
    const response = await fetch(loadURL);
    const data = await response.json();
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

  function calServer() {
    let itcServer = "http://localhost:5050/fibonacci/" + numberFib.value; //? why move itcServer decleration outside calcButton function will remove all the errors alerts(e.g. number 42 error, number > 50 alert)?
    let newResult = {
      text: numberFib.value,
      dateCreated: new Date(),
    };

    async function calcByItcServer() {
      const response = await fetch(itcServer);
      if (!response.ok) {
        handleError();
        const responseText = await response.text();
        errorMsg.innerText = responseText;
      } else {
        numberFib.classList.remove("error-input");
      }
      const data = await response.json();
      if (typeof data === "string") {
        errorMsg.innerText = data;
      } else {
        yOutPut.innerText = data.result;
        pushList(newResult.text, data.result, newResult.dateCreated);
      }
      unpresentLoader();
    }

    if (parseInt(numberFib.value) > 50) {
      highlightError();
      errorBox.innerText = "Can't be larger than 50";
    } else if (numberFib.value === "") {
      yOutPut.innerText = "";
    } else {
      presentLoader();
      yOutPut.innerText = "";
      calcByItcServer();
    }
  }

  // function fibonacciCalc(num) {
  //   let resultNum = 0;
  //   if (num === 0) {
  //     return 0;
  //   } else if (num === 1) {
  //     return 1;
  //   } else if (num > 1) {
  //     resultNum = fibonacciCalc(num - 1) + fibonacciCalc(num - 2);
  //     return resultNum;
  //   } else if (num === 42) {
  //     errorMsg.innerText = "42 is the meaning of life";
  //     handleError();
  //   } else if (num > 50) {
  //     highlightError();
  //     errorBox.innerText = "Can't be larger than 50";
  //   } else {
  //     console.log(resultNum);
  //     return "out of scope";
  //   }
  // }

  function fibonacciCalc(x) {
    let y;
    console.log("type of input is", typeof x);
    if (x == 0) {
      return 0;
    } else if (x == 1) {
      return 1;
    } else {
      y = fibonacciCalc(x - 1) + fibonacciCalc(x - 2);
      return y;
    }
  }

  function isChecked() {
    if (saveResult.checked) {
      calServer();
    } else {
      fibonacciCalc(parseInt(numberFib.value));
      yOutPut.innerText = fibonacciCalc(numberFib.value);
      pushList(numberFib.value, yOutPut.innerText, new Date());
    }
  }

  loadResults();
  sortType();

  function calcButton() {
    removeError(); //? why removedError() function can not be placed after the fetch bellow
    isChecked();
  }

  calBtn.addEventListener("click", calcButton);
})();

//to check: why the resultList is null?
// let resultList = document.getElementById("resultList");
// console.log(result);
// console.log(typeof result);
// console.log(resultList);
// console.log(typeof resultList);
// console.log(resultList.innerHTML);
