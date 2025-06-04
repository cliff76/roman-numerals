import {Application} from "express";
import apiRoutes from "./routes/api.routes.js";

export default class Routes {
    constructor(app: Application) {
        this.configureRoutes(app);
    }

    private configureRoutes(app: Application): void {
        app.use("/api", apiRoutes);
    }
}