const express= require('express');
const messagesRouter = express.Router();
const messagesController = require("../../controllers/messages/messages.controller")

messagesRouter.get("/",messagesController.getMessages)
messagesRouter.post("/",messagesController.createMessage)
messagesRouter.post("/read/:id",messagesController.markMessageAsRead)
messagesRouter.delete("/delete/:id",messagesController.deleteMessage)
module.exports = messagesRouter;