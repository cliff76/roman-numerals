import express, {Application} from "express";
import Routes from "./routes";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig.js';

export default class Server {
    constructor(app: Application) {
        this.config(app);
        new Routes(app);
    }

    private config(app: Application): void {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        // Serve Swagger UI
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
}
