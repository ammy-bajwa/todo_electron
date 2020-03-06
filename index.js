const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainBrowserWindow, addWindow;

app.on("ready", () => {
  mainBrowserWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainBrowserWindow.loadURL(`file://${__dirname}/index.html`);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

const addTodoWindow = () => {
  addWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: "Add New Todo"
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
