function getButton() {
  let number = parseInt(document.getElementById("numX").value);
  let itcServer = "http://localhost:5050/fibonacci/" + number.toString();
  let yOutPut = document.getElementById("numY");
  fetch(itcServer)
    .then((response) => response.json())
    .then((data) => (yOutPut.innerText = data.result));
}

//get button callback getButton function once firing the click event
document.getElementById("calculate").addEventListener("click", getButton);