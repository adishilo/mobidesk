import { MenuItem, Menu, Tray } from "electron";
import { AboutAction } from "./actions/AboutAction";

export default class AppMenu {
    public static readonly BATTERY_POSITION = 0;

    private menuTemplate = [
        new MenuItem({ label: 'Battery: 57%', type: 'normal', enabled: false }),
        new MenuItem({ type: 'separator' }),
        new MenuItem({ label: 'About', click: AboutAction.do }),
        new MenuItem({ type: 'separator' }),
        new MenuItem({ role: 'quit', accelerator: 'cmd+Q' })
    ];
    
    public constructor(private tray: Tray) {}
    
    public setMenu() {
        const contextMenu = Menu.buildFromTemplate(this.menuTemplate);

        this.tray.setContextMenu(contextMenu);
    }

    public setReadOnlyItemTitle(position: number, itemTitle: string) {
        this.menuTemplate[position].label = itemTitle;

        this.setMenu();
    }
}