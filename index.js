const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url'); 

const createWindow = function () {
  var win = new BrowserWindow({width: 800, height: 600, minWidth: 800, minHeight: 600});
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src/app.ejs'),
    protocol: 'file:',
    slashes: true
  }));
};

app.on('ready', createWindow);
app.on('window-all-closed', app.quit);
