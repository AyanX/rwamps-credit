const express = require('express');

const productsRouter = require('./routers/products/products.router');
const loansRouter = require('./routers/loans/loans.router');
const app = express();
const cors = require('cors');
const faqsRouter = require('./routers/faqs/faqs.router');

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:8080"],
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/products", productsRouter);
app.use("/api/loans", loansRouter);

app.use("/api/contacts/faqs", faqsRouter);

module.exports = app;