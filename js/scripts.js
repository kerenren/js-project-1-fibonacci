let loader = document.getElementById("loader");
let errorBox = document.getElementById("error");

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
    // selfnote for debug: console.log("loader is presented");
    fetch(itcServer)
      .then(function (response) {
        // console.log(response);
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
        // console.log(data);
        yOutPut.innerText = data.result;
        unpresent(loader);
        // selfnote for debug: console.log("loader is unpresented");
      });
  }
}

//get button callback getButton function once firing the click event
let calBtn = document.getElementById("calculate");
calBtn.addEventListener("click", getButton);
