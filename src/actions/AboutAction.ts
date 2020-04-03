import { MenuItem, BrowserWindow, KeyboardEvent, dialog } from "electron";

export class AboutAction {
    public static do(menuItem: MenuItem, browserWindow: BrowserWindow, event: KeyboardEvent) {
        dialog.showMessageBox({
            type: 'none',
            message: 'About mist',
            title: 'mist',
            detail: 'Details here'
        });
    }
}