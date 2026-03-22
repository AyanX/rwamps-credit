const express = require("express");
const socialsController = require("../../../controllers/socials/socials.controller");
const useAuth = require("../../../utils/middlewares/useAuth");
const socialsRouter = express.Router();

socialsRouter.get("/", socialsController.getSocials);

socialsRouter.post("/", useAuth, socialsController.createSocial);

socialsRouter.put("/", useAuth, socialsController.updateSocial);


module.exports = socialsRouter;