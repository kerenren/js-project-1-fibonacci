(() => {
  let loader = document.getElementById("loader");
  let errorBox = document.getElementById("error");
  let calBtn = document.getElementById("calculate");
  let errorMsg = document.getElementById("error-msg");

  function present(selector) {
    selector.classList.remove("d-none");
  }
  function unpresent(selector) {
    selector.classList.add("d-none");
  }

  function calcButton() {
    let number = document.getElementById("inputNum");
    let yOutPut = document.getElementById("resultNum");
    let itcServer = "http://localhost:5050/fibonacci/" + number.value;

    function highlightError() {
      number.classList.add("error-input");
      present(errorBox);
      yOutPut.innerText = "";
    }

    function removeError() {
      number.classList.remove("error-input");
      unpresent(errorMsg);
      unpresent(errorBox);
    }

    function handleError() {
      highlightError();
      present(errorMsg);
      unpresent(errorBox);
      unpresent(loader);
    }

    removeError();

    if (parseInt(number.value) > 50) {
      highlightError();
      errorBox.innerText = "Can't be larger than 50";
    } else {
      present(loader);
      fetch(itcServer)
        .then(function (response) {
          // console.log(response);
          if (!response.ok) {
            handleError();
            // console.log(response.text());
            return response.text();
          } else {
            number.classList.remove("error-input");
            return response.json();
          }
        })
        .then(function (data) {
          // console.log(data);
          if (typeof data === "string") {
            errorMsg.innerText = data;
          } else {
            yOutPut.innerText = data.result;
          }
          unpresent(loader);
        });
    }
  }

  calBtn.addEventListener("click", calcButton);
})();
