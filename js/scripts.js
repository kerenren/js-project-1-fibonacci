let loader = document.getElementById("loader");
let errorBox = document.getElementById("error");
let calBtn = document.getElementById("calculate");

function present(selector) {
  selector.classList.remove("d-none");
}

function unpresent(selector) {
  selector.classList.add("d-none");
}

function getButton() {
  let number = document.getElementById("numX");
  let yOutPut = document.getElementById("numY");
  let itcServer = "http://localhost:5050/fibonacci/" + number.value;
  
  function highlightError() {
    number.classList.add("error-input");
    present(errorBox);
  }

  function removeError() {
    number.classList.remove("error-input");
  }

  if (parseInt(number.value) >= 50) {
    highlightError();
    errorBox.innerText = "400 (Bad Request)";
  } else {
    present(loader);
    removeError();
    fetch(itcServer)
      .then(function (response) {
        if (response.ok === false || response.status !== 200) {
          errorBox.innerText = response.statusText;
          highlightError();
          unpresent(loader);
        } else {
          unpresent(errorBox);
          removeError();
          number.classList.remove("error-input");
        }
        return response.json();
      })
      .then(function (data) {
        yOutPut.innerText = data.result;
        unpresent(loader);
      });
  }
}

calBtn.addEventListener("click", getButton);
