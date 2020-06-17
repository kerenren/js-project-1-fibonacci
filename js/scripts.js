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
        console.log(resultObj);
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

  function calcButton() {
    removeError(); //? why removedError() function can not be placed after the fetch bellow
    loadResults();
    calServer();
  }

  calBtn.addEventListener("click", calcButton);
})();
