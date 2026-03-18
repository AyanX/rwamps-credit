const express = require("express");
const faqsController = require("../../controllers/faqs/faqs.controller");
const faqsRouter = express.Router();

faqsRouter.get("/", faqsController.getAllFaqs);
faqsRouter.post("/", faqsController.createFaq);
faqsRouter.put("/:id", faqsController.updateFaq);
faqsRouter.delete("/:id", faqsController.deleteFaq);


module.exports = faqsRouter;