import express from "express";
import{promises as fs} from "node:fs"
import { v4 as uuidv4 } from "uuid";
import morgan from "morgan";

const app = express();
const PORT = 4001;

import {
  getQuotes,
  getQuoteByID,
  addQuote,
  editQuote,
  deleteQuote,
} from "./quote.js";

app.use(express.json());// parses the body data and makes it available on req.body

app.use(morgan('dev'));
console.log();

app.get("/", function (req, res) {
  res.send("Welcome to the inspirational quotes API");
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});



//create a GET route handler for all quotes
app.get("/quotes", async function(req, res) {
  const quotes  = await getQuotes()
  const response = {
       status: "sucess",
       data:quotes,
  }
 return  res.status(201).json(quotes)
  });

//Get quotes by id 

app.get("/quotes/:id", async function(req, res) {
  const id = req.params.id;

  
    const quote = await getQuoteByID(id);
    
    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    const response = {
      status: "success",
      data: quote,
    };

    return res.status(200).json(response);
  })


//Write a request handler to return the correct response and perform the correct action when a `POST`
// request is received to `/quotes`. Choose the appropriate helper function from `quote.js` to create your data.

app.post(	"/quotes" , async function (req,res){
//store the quote text and author from the request
const {quoteText, author} = req.body
// const quoteText = req.body.quoteText;
// const author = req.body.author;
if(!quoteText || !author){
  return res.status(400).json({Error: "Quote text and author required"})
}

  const newQuoteData = {
    id: uuidv4(),
    quoteText,
    author,
  }
  await addQuote(newQuoteData);
  res.json(newQuoteData);


// const quote = await addQuote(quoteText,author)
// const response = {
//   status: "success",
//   data: quote,

// };

// return res.status(201).json(response);
  
});


//
app.patch("/quotes/:id", async function (req, res) {
// return the newly created quote
//create a response object

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