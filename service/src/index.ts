import { app, BrowserWindow, Tray } from 'electron';
import { menubar } from "menubar";
import AppMenu from './application-menu/AppMenu';
import { MenuLabelSlot } from "./application-menu/MenuLabelSlot";
import { SLOT_TYPE_BATTERY_POWER } from '../../common/slot-types';

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
    let appMenu = new AppMenu(tray);

    appMenu.registerNotifierLabelSlots(new MenuLabelSlot(SLOT_TYPE_BATTERY_POWER));
    appMenu.registerNotifierLabelSlots(new MenuLabelSlot('ping', 'Ping: available'));
    appMenu.registerNotifierLabelSlots(new MenuLabelSlot('llama', 'Llama: Kacha'));

    // appMenu.registerNotifierLabelSlots(new MenuLabelSlot(SLOT_TYPE_BATTERY_POWER));

    appMenu.refreshMenu();

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
