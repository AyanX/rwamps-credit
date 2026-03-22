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
const partnersRouter = require('./routers/homepage/partners/partners.router');
const whatWeDoRouter = require('./routers/homepage/whar-we-do/what-we-do.router');
const socialsRouter = require('./routers/homepage/socials/socials.router');
const authRouter = require('./routers/auth/auth.router');
const cookieParser = require('cookie-parser');
const useAuth = require('./utils/middlewares/useAuth');
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:8080", "http://localhost:8081"],
  credentials: true,
}));
const helmet = require('helmet');
const { ne } = require('drizzle-orm');
app.use(helmet());


app.use(
  "/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(cookieParser());

app.use("/api/products", productsRouter);
app.use("/api/loans", loansRouter);

app.use("/api/contacts/faqs", faqsRouter);

app.use("/api/contacts/branches", branchesRouter);

app.use("/api/about", aboutRouter);
app.use("/api/services", servicesRouter);

app.use("/api/messages", messagesRouter);

app.use("/api/homepage/stats",statsRouter);

app.use("/api/homepage/testimonies", testimonyRouter)

app.use("/api/homepage/partners", partnersRouter)

app.use("/api/homepage/footer-socials", socialsRouter)

app.use("/api/homepage/what-we-do", whatWeDoRouter)

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
  next();
});

module.exports = app;