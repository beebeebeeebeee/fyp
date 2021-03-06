const electron = require("electron");
const { net } = require('electron')
const config = require("../config");
const url = require("url");
const path = require("path");
const signUpDebug = require('debug')('fyp:signup')
const loginDebug = require('debug')('fyp:login')
const logoutDebug = require('debug')('fyp:logout')

const { app, BrowserWindow, ipcMain } = electron;

//----------------------------------------------------------
// login
//----------------------------------------------------------
//listen for login:send event from login.js
ipcMain.on("login:send", function (e, account, password) {
  const resBody = JSON.stringify({ account: account, password: password })

  loginDebug('Authenticating users...')

  //checking process...
  const request = net.request({
    method: 'POST',
    protocol: 'http:',
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth',

  })

  request.on('response', (res) => {
    const statusCode = res.statusCode
    loginDebug(`[Response]STATUS: ${res.statusCode}`);

    res.on('data', (body) => {
      const response = body.toString()

      if (statusCode == 200) {
        loginDebug(`[Response]: Login succuess. ${response} is logined`);

        //crate new window for after login success interface
        createWindow("main");

        //close the login window
        loginWindow.close();
      }else{
        loginDebug(`[Response]: Login failed. ${response}`);
        
        //if else send error to registerWindow.webContents.send("signup:error");
        loginWindow.webContents.send("login:error", response);

      }
      // console.log(`BODY: ${body}`);
    })
  })

  request.on('error', (error) => { 
    console.log(`ERROR: ${JSON.stringify(error)}`) 
  });

  request.setHeader('Content-Type', 'application/json'); 
  request.write(resBody, 'utf-8'); 
  request.end();
});

//----------------------------------------------------------
// signup
//----------------------------------------------------------
//handel signup:send request from register.js
ipcMain.on("signup:send", function (e, account, password) {
  const resBody = JSON.stringify({ account: account, password: password })

  signUpDebug(`Signing up ...`);
  
  // Handling request ...
  // Hardcoded the POST address for simplicity
  const request = net.request({
    method: 'POST',
    protocol: 'http:',
    hostname: 'localhost',
    port: 3000,
    path: '/api/users',

  })

  request.on('response', (res) => {
    const statusCode = res.statusCode

    signUpDebug(`[Response]STATUS: ${res.statusCode}`);

    res.on('data', (body) => {
      const response = body.toString()
      if (statusCode == 200) {
        signUpDebug(`[Response]: Signup succuess. ${response} is saved.`);
        loginWindow.webContents.send("signup:success", response);
      }else{
        signUpDebug(`[Response]: Signup failed. ${response}`);
        
        //if else send error to registerWindow.webContents.send("signup:error");
        loginWindow.webContents.send("signup:error", response);

      }
      // console.log(`BODY: ${body}`);
    })
  })

  request.on('error', (error) => { 
    console.log(`ERROR: ${JSON.stringify(error)}`) 
  });

  request.setHeader('Content-Type', 'application/json'); 
  request.write(resBody, 'utf-8'); 
  request.end();
});

//----------------------------------------------------------
// redirect
//----------------------------------------------------------
//listen for logout:send event from mainWindow.js
ipcMain.on("logout:send", function (e) {
  logoutDebug("Logout requested.");
  //crate new window for login interface
  createWindow("login");
  //close the main window
  mainWindow.close();
});

//----------------------------------------------------------
// a function for handel all create window
//----------------------------------------------------------
function createWindow(name) {
  switch (name) {
    case "login":
      //crate new window for login interface
      loginWindow = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
          //enable client side .js can use require node.js
          nodeIntegration: true,
          preload: path.join(__dirname, '/../preload.js'),
        },
      });
      //load html into window
      loginWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, "/../public/login.html"),
          protocol: "file:",
          slashes: true,
        })
      );
      break;
    case "main":
      //crate new window for after login success interface
      mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
          //enable client side .js can use require node.js
          nodeIntegration: true,
        },
      });
      //load html into window
      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, "/../public/mainWindow.html"),
          protocol: "file:",
          slashes: true,
        })
      );
      break;
  }
}
