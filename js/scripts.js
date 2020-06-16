(() => {
  let loader = document.getElementById("loader");
  let loader2 = document.getElementById("loader2");
  let errorBox = document.getElementById("error");
  let calBtn = document.getElementById("calculate");
  let errorMsg = document.getElementById("error-msg");
  let result = document.getElementById("result");
  let loadURL = "http://localhost:5050/getFibonacciResults";

  function present(selector) {
    selector.classList.remove("d-none");
  }

  function unpresent(selector) {
    selector.classList.add("d-none");
  }

  function calcButton() {
    let numberFib = document.getElementById("inputNum");
    let yOutPut = document.getElementById("resultNum");
    let itcServer = "http://localhost:5050/fibonacci/" + numberFib.value;
    let newResult = {
      text: numberFib.value,
      dateCreated: Date.now(),
    };

    function loadResults() {
      fetch(loadURL)
        .then((response) => response.json())
        .then((data) => {
          let resultObj = data.results;
          console.log(resultObj);
          for (let i = 0; i < resultObj.length; i++) {
            let arrayFib = resultObj[i];
            let li = document.createElement("li");
            li.classList.add(
              "border-bottom",
              "mb-3",
              "border-dark",
              "d-inline-block",
              "pb-3"
            );
            li.innerHTML = `The Fibonacci of <b>${arrayFib.number}</b> is <b>${
              arrayFib.result
            }</b>. Calculated at ${new Date(arrayFib.createdDate)}`;
            result.prepend(li);
          }
          return resultObj;
        });
    }

    loadResults();

    fetch(loadURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(newResult),
    }).then((response) => {
      if (response.ok) {
        loadResults();
      }
    });

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
    removeError();

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
          }
          unpresentLoader();
        });
    }
  }

  calBtn.addEventListener("click", calcButton);
})();
