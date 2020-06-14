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

  if (parseInt(number.value) >= 50) {
    present(errorBox);
    errorBox.innerText = "400 (Bad Request)";
  } else {
    present(loader);
    fetch(itcServer)
      .then(function (response) {
        if (response.ok === false || response.status !== 200) {
          errorBox.innerText = response.statusText;
          present(errorBox);
          unpresent(loader);
        } else {
          unpresent(errorBox);
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
