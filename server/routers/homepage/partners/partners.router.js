const express = require("express");

const partnersController = require("../../../controllers/partners/partners.controller");

const partnersRouter = express.Router();

partnersRouter.get("/", partnersController.getAllPartners);
partnersRouter.post("/", partnersController.createPartner);
partnersRouter.put("/:id", partnersController.updatePartner);
partnersRouter.delete("/:id", partnersController.deletePartner);

module.exports = partnersRouter;