import { MenuItem, Menu, Tray } from "electron";
import { AboutAction } from "../actions/AboutAction";
import { MenuLabelSlot } from "./MenuLabelSlot";
import Logger from "../../../common/Logger";

const logger = new Logger('AppMenu');

export default class AppMenu {
    public static readonly BATTERY_POSITION = 0;

    private menuSlots = new Map<string, MenuLabelSlot>();

    private menuTemplate: MenuItem[];
    
    public constructor(private tray: Tray) {}

    public registerNotifierLabelSlots(slot: MenuLabelSlot) {
        if (!slot.label) {
            if (this.menuSlots.has(slot.id)) {
                throw new Error(`Slot type '${slot.id}' already exists, can only change its value`);
            }
        }

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
            if (slot.label) {
                this.menuTemplate.push(new MenuItem({ label: slot.label, type: 'normal', enabled: false }));
            } else {
                logger.warn(`Menu slot '${id}' does not have any label set`);
            }
        });
    }
}