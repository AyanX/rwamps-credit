const express = require('express');

const productsRouter = require('./routers/products/products.router');
const loansRouter = require('./routers/loans/loans.router');
const app = express();
const cors = require('cors');
const faqsRouter = require('./routers/faqs/faqs.router');
const branchesRouter = require('./routers/branches/branches.router');
const aboutRouter = require('./routers/about/about.router');
const servicesRouter = require('./routers/services/services.router');
const messagesRouter = require('./routers/messages/messages.router');


const path = require('path');
const statsRouter = require('./routers/homepage/stats/stats.router');
const testimonyRouter = require('./routers/homepage/testimony/testimony.router');
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:8080"],
  credentials: true,
}));


app.use(
  "/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api/products", productsRouter);
app.use("/api/loans", loansRouter);

app.use("/api/contacts/faqs", faqsRouter);

app.use("/api/contacts/branches", branchesRouter);

app.use("/api/about", aboutRouter);
app.use("/api/services", servicesRouter);

app.use("/api/messages", messagesRouter);

app.use("/api/homepage/stats",statsRouter);

app.use("/api/homepage/testimonies", testimonyRouter)

module.exports = app;