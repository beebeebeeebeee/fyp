const electron = require("electron");
const { ipcRenderer } = electron;

const submitForm = document.getElementById("login");
const register = document.getElementById("register");

//add action listener when form is submitted
submitForm.addEventListener("submit", function (e) {
  //disable actually submit the form
  e.preventDefault();

  account = document.getElementById("accountInput").value;
  password = document.getElementById("passwordInput").value;
  //send the account and password to the ipcmain.js
  ipcRenderer.send("login:send", account, password);
});

//add action listener for register account
register.onclick = function () {
  ipcRenderer.send("signup:request");
};

ipcRenderer.on("login:error", function (e) {
  //tell user login failed
  document.getElementById("loginStatus").innerHTML = "Login failed!";

  //reset the account and password input value
  document.getElementById("accountInput").value = "";
  document.getElementById("passwordInput").value = "";

  //select the account input
  document.getElementById("accountInput").select();
});
