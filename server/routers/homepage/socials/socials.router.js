const express = require("express");
const socialsController = require("../../../controllers/socials/socials.controller");
const socialsRouter = express.Router();

socialsRouter.get("/", socialsController.getSocials);

socialsRouter.post("/", socialsController.createSocial);

socialsRouter.put("/", socialsController.updateSocial);


module.exports = socialsRouter;