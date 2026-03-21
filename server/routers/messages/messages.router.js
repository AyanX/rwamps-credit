const express= require('express');
const messagesRouter = express.Router();
const messagesController = require("../../controllers/messages/messages.controller");
const useAuth = require('../../utils/middlewares/useAuth');

messagesRouter.get("/", useAuth, messagesController.getMessages);
messagesRouter.post("/", messagesController.createMessage);
messagesRouter.post("/read/:id", useAuth, messagesController.markMessageAsRead);
messagesRouter.delete("/delete/:id", useAuth, messagesController.deleteMessage);
module.exports = messagesRouter;