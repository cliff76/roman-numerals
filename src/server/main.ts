import express, { Request, Response } from "express";
import ViteExpress from "vite-express";
import Server from "./server.js";

const app = express();
const port = parseInt(process.env.PORT || '3000');

// Middleware to parse JSON bodies
app.use(express.json());
new Server(app);

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
).on("error", (err) => {
  console.error("Server error:", err)
});
