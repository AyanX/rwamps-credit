const express = require('express');

const testimonyRouter = express.Router();

const testimonyController = require("../../../controllers/testimony/testimony.controller");
const useAuth = require('../../../utils/middlewares/useAuth');

testimonyRouter.get("/", testimonyController.getTestimonies);

testimonyRouter.post("/", useAuth, testimonyController.createTestimony);

testimonyRouter.put("/:id", useAuth, testimonyController.updateTestimony);

testimonyRouter.delete("/:id", useAuth, testimonyController.deleteTestimony);



module.exports = testimonyRouter;