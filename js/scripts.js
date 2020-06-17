(() => {
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

  function present(selector) {
    selector.classList.remove("d-none");
  }

  function unpresent(selector) {
    selector.classList.add("d-none");
  }

  function pushList(inputNumber, calResult, calTime) {
    let li = document.createElement("li");
    li.classList.add(
      "border-bottom",
      "mb-3",
      "border-dark",
      "d-inline-block",
      "pb-3"
    );
    li.innerHTML = `The Fibonacci of <b>${inputNumber}</b> is <b>${calResult}</b>. Calculated at ${calTime}`;
    result.prepend(li);
  }

  function loadResults() {
    fetch(loadURL)
      .then((response) => response.json())
      .then((data) => {
        let resultObj = data.results;
        for (let i = 0; i < resultObj.length; i++) {
          let arrayFib = resultObj[i];
          pushList(
            arrayFib.number,
            arrayFib.result,
            new Date(arrayFib.createdDate)
          );
        }
        return resultObj;
      });
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
    if (parseInt(numberFib.value) > 50) {
      highlightError();
      errorBox.innerText = "Can't be larger than 50";
    } else if (numberFib.value === "") {
      yOutPut.innerText = "";
    } else {
      presentLoader();
      fetch(itcServer)
        .then(function (response) {
          if (!response.ok) {
            handleError();
            return response.text();
          } else {
            numberFib.classList.remove("error-input");
            return response.json();
          }
        })
        .then(function (data) {
          if (typeof data === "string") {
            errorMsg.innerText = data;
          } else {
            // console.log(data);
            yOutPut.innerText = data.result;
            pushList(newResult.text, data.result, newResult.dateCreated);
          }
          unpresentLoader();
        });
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
  function calcButton() {
    removeError(); //? why removedError() function can not be placed after the fetch bellow
    isChecked();
    // calServer();
  }

  calBtn.addEventListener("click", calcButton);
})();
