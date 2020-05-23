import express from "express";
import AppMenu from "../application-menu/AppMenu";

export default class MainRouter{
    private app = express();

    public constructor(private menuManager: AppMenu) {
        this.app.post('/reports/', (request, response, next) => {
            
        });
    }
}