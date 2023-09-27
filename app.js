import express from "express";
import{promises as fs} from "node:fs"

const app = express();
const PORT = 4000;

import {
  getQuotes,
  getQuoteByID,
  addQuote,
  editQuote,
  deleteQuote,
} from "./quote.js";

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to the inspirational quotes API");
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});

app.get("/quotes", async function(req, res) {
  

    const quotesJSON = await fs.readFile("quotes.json", "utf-8");
  res.send(quotesJSON)
  });

