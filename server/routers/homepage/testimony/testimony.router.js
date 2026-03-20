const express = require('express');

const testimonyRouter = express.Router();

const testimonyController = require("../../../controllers/testimony/testimony.controller")

testimonyRouter.get("/", testimonyController.getTestimonies);

testimonyRouter.post("/", testimonyController.createTestimony);

testimonyRouter.put("/:id", testimonyController.updateTestimony);

testimonyRouter.delete("/:id", testimonyController.deleteTestimony);



module.exports = testimonyRouter;