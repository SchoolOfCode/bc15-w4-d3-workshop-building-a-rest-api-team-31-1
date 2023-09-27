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

//when a GET request is received to /quotes/:id, with a particular ID provided in the url. Choose the appropriate helper function from quote.js to get your data.

app.get("qoutes/:id", async function(req,res){

 const { id } = req.params;

 const qouteById 
});