import { app, BrowserWindow, Tray, Menu } from 'electron';
import { menubar } from "menubar";
import { AboutAction } from './actions/AboutAction';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// const mb = menubar({
//     index: MAIN_WINDOW_WEBPACK_ENTRY,
//     browserWindow: {
//         height: 400,
//         width: 400
//     },
//     icon: 'src/assets/appIcon.png'
// });

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

const createWindow = () => {
    const tray = new Tray('./src/assets/appIcon.png');
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item3', type: 'normal', checked: true },
        { type: 'separator' },
        { label: 'About', click: AboutAction.do },
        { type: 'separator' },
        { role: 'quit', accelerator: 'cmd+Q' }
    ]);
    tray.setContextMenu(contextMenu);

    const mb = menubar({ tray });

    mb.on('ready', () => {
        console.log('Menubar app is ready.');
        // your app code here
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
