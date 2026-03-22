const express = require("express");

const partnersController = require("../../../controllers/partners/partners.controller");
const useAuth = require("../../../utils/middlewares/useAuth");

const partnersRouter = express.Router();

partnersRouter.get("/", partnersController.getAllPartners);
partnersRouter.post("/", useAuth, partnersController.createPartner);
partnersRouter.put("/:id", useAuth, partnersController.updatePartner);
partnersRouter.delete("/:id", useAuth, partnersController.deletePartner);

module.exports = partnersRouter;