import express, { Request, Response } from "express";
import ViteExpress from "vite-express";
import Server from "./server.js";

const app = express();
const port = parseInt(process.env.PORT || '3000');

// Middleware to parse JSON bodies
app.use(express.json());
new Server(app);
// Placeholder for the conversion logic
function convert(numberToConvert: number): string {
  // TODO: Implement actual Roman numeral conversion logic
  return `Roman numeral for ${numberToConvert} (not implemented yet)`;
}

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

app.post("/convert", (req: Request, res: Response) => {
  const { number } = req.body;

  if (typeof number !== 'number') {
    return res.status(400).json({ error: "Invalid input: 'number' must be a number." });
  }

  // Basic validation for the number range if needed, e.g.
  // if (number < 1 || number > 3999) {
  //   return res.status(400).json({ error: "Number out of range (1-3999)." });
  // }

  const romanNumeral = convert(number);
  res.json({ result: romanNumeral });
});

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`),
).on("error", (err) => {
  console.error("Server error:", err)
});
