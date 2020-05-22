import { MenuItem, Menu, Tray } from "electron";
import { AboutAction } from "../actions/AboutAction";
import { MenuLabelSlot } from "./MenuLabelSlot";

export default class AppMenu {
    public static readonly BATTERY_POSITION = 0;

    private menuSlots = new Map<string, MenuLabelSlot>();

    private menuTemplate: MenuItem[];
    
    public constructor(private tray: Tray) {}

    public registerNotifierLabelSlots(slot: MenuLabelSlot) {
        this.menuSlots.set(slot.id, slot);
    }

    public refreshMenu() {
        this.menuTemplate = [];

        this.addRegisteredMenuSlot();
        this.menuTemplate.push(new MenuItem({ type: 'separator' }));
        this.addConstantMenu();

        this.updateMenu();
    }

    private updateMenu() {
        const contextMenu = Menu.buildFromTemplate(this.menuTemplate);

        this.tray.setContextMenu(contextMenu);
    }

    private addConstantMenu() {
        this.menuTemplate.push(
            new MenuItem({ label: 'About', click: AboutAction.do }),
            new MenuItem({ type: 'separator' }),
            new MenuItem({ role: 'quit', accelerator: 'cmd+Q' })    
        );
    }

    private addRegisteredMenuSlot() {
        this.menuSlots.forEach((slot, id) => {
            this.menuTemplate.push(new MenuItem({ label: slot.label, type: 'normal', enabled: false }));
        });
    }
}