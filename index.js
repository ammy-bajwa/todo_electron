const electron = require("electron");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainBrowserWindow, addWindow;

app.on("ready", () => {
  mainBrowserWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainBrowserWindow.on("closed", () => app.quit());

  mainBrowserWindow.loadURL(`file://${__dirname}/index.html`);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

const addTodoWindow = () => {
  addWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: "Add New Todo",
    webPreferences: {
      nodeIntegration: true
    }
  });
  addWindow.loadURL(`file://${__dirname}/addTodo.html`);
};

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Todo",
        click() {
          addTodoWindow();
        }
      },
      {
        label: "Exit",
        accelerator: (() => {
          if (process.platform === "darwin") {
            return "Command+Q";
          } else {
            return "Ctrl+Q";
          }
        })(),
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "Tools",
    submenu: [
      {
        label: "Developer_Tools",
        accelerator: (() => {
          if (process.platform === "darwin") {
            return "Command+Shift+I";
          } else {
            return "Ctrl+Shift+I";
          }
        })(),
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}

ipcMain.on("todo:add", (event, todoText) => {
  mainBrowserWindow.webContents.send("todo:addToList", todoText);
  addWindow.close();
});
