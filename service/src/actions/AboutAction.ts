import { MenuItem, BrowserWindow, KeyboardEvent, dialog } from "electron";

export class AboutAction {
    public static do(menuItem: MenuItem, browserWindow: BrowserWindow, event: KeyboardEvent) {
        dialog.showMessageBox({
            type: 'info',
            message: 'About mist',
            detail: 'Details here'
        });
    }
}