import {Router} from "express";
import {convert} from "../controllers/convert.controller.js";

class ApiRoutes {
    router = Router();

    constructor() {
        this.router.post("/convert", convert);
    }
}

export default new ApiRoutes().router;