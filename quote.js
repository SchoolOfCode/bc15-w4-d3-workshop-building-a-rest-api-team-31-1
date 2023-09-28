import { promises as fs } from "node:fs";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const filePath = path.resolve(process.cwd(), "quotes.json");


export async function addQuote(quoteText, author = "Unknown") {
    
  const newQuote = {
  quoteText,
  author,
  id: uuidv4(),
};
 
  await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf8")
  const quoteList = await fs.readFile("quotes.json");
  const quotes = JSON.parse(quoteList);
  //console log to test
  //console.log(quotesList);
  quotes.push(newQuote);

  const JSONData = JSON.stringify(quotes);
  await fs.writeFile("quotes.json", JSONData);
  return newQuote;
}

export async function getQuotes() {
  const quotesJSON = await fs.readFile("quotes.json", "utf-8");
  const quotes = JSON.parse(quotesJSON);
  return quotes;
}

export async function getQuoteByID(id) {
  const quotesJSON = await fs.readFile("quotes.json", "utf-8");
  const quotes = JSON.parse(quotesJSON);

  for (const quote of quotes) {
    if (quote.id === id) {
      return quote;
    }
  }

  return null;
}

export async function editQuote(id, newQuoteText, newAuthor) {
  const quotesJSON = await fs.readFile(filePath, "utf-8");
  const quotes = JSON.parse(quotesJSON);

  let quote = null;

  for (let i = 0; i < quotes.length; i++) {
    if (quotes[i].id === id) {
      quote = quotes[i];
      quotes[i].quoteText = newQuoteText ?? quotes[i].quoteText;
      quotes[i].author = newAuthor ?? quotes[i].author;
      break;
    }
  }

  await fs.writeFile(filePath, JSON.stringify(quotes, null, 2), "utf-8");

  return quote;
}

export async function deleteQuote(id) {
  const quotesJSON = await fs.readFile(filePath, "utf-8");
  const quotes = JSON.parse(quotesJSON);

  let quoteIndex = null;

  for (let i = 0; i < quotes.length; i++) {
    if (quotes[i].id === id) {
      quoteIndex = i;
      break;
    }
  }

  if (quoteIndex !== null) {
    const deletedQuotes = quotes.splice(quoteIndex, 1);
    await fs.writeFile(filePath, JSON.stringify(quotes, null, 2), "utf-8");
    return deletedQuotes[0];
  }

  return null;
}
