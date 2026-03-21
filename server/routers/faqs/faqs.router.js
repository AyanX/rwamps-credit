const express = require("express");
const faqsController = require("../../controllers/faqs/faqs.controller");
const useAuth = require("../../utils/middlewares/useAuth");
const faqsRouter = express.Router();

faqsRouter.get("/", faqsController.getAllFaqs);
faqsRouter.post("/",useAuth,  faqsController.createFaq);
faqsRouter.put("/:id", useAuth, faqsController.updateFaq);
faqsRouter.delete("/:id", useAuth, faqsController.deleteFaq);


module.exports = faqsRouter;