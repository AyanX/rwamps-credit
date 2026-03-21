
const express = require("express");
const AboutController = require("../../controllers/about/about.controller");
const useAuth = require("../../utils/middlewares/useAuth");
const aboutRouter = express.Router();

aboutRouter.get("/",  AboutController.getAboutUsInfo);
aboutRouter.post("/", useAuth, AboutController.createAboutUsInfo);
aboutRouter.put("/", useAuth, AboutController.updateAboutUsInfo);
aboutRouter.delete("/:id", useAuth, AboutController.deleteAboutUsInfo);

module.exports =aboutRouter