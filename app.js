import express from "express";
import{promises as fs} from "node:fs"
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 4001;

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


//create a GET route handler for all quotes
app.get("/quotes", async function(req, res) {
  const quotesJSON = await fs.readFile("quotes.json", "utf-8");
  res.send(quotesJSON)
  });

//Get quotes by id 

app.get("/quotes/:id", async function(req,res){
 const id = req.params.id;
 console.log(id);
 const quote = await getQuoteByID(id); 
 
 if (!quote) {
   return res.status(404).json({ error: 'Quote not found' });
 }else{

  res.json(quote)
 }
});


//Write a request handler to return the correct response and perform the correct action when a `POST`
// request is received to `/quotes`. Choose the appropriate helper function from `quote.js` to create your data.

app.post(	"/quotes" , async function (req,res){

  const newQuoteData = {
    id:uuidv4(),
    quoteText: "It\'s the possibility of having a dream come true that makes life interesting",
    author: "Paulo cohelo",
 };
 
  await addQuote(newQuoteData);
  res.send(newQuoteData)
});

app.patch("/quotes/:id", async function (req, res) {

  const quoteId = req.params.id;
  const update = {
    quoteText: "makes life interesting",
    author: "Paulo cohelo",
  };
  const updateQuote = await editQuote(quoteId, update.quoteText,update.author);
  if (update) {
    res.status(200).json({ message: 'Quote updated successfully', quote: update });
  } else {
    res.status(404).json({ message: 'Quote not found' });
  }


})

app.delete("/quotes/:id", async function(req,res){
  const id = req.params.id;
  const deletedQuote = await getQuoteByID(id);
  if(!deletedQuote){
    return res.status(404).json({ error: 'Quote not found' });
  }else{
    await deleteQuote(id)
    res.status(200).json({ message: 'Quote deleted successfully', quote: deletedQuote});
  }});