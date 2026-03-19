
const express = require("express");
const AboutController = require("../../controllers/about/about.controller");
const aboutRouter = express.Router();

aboutRouter.get("/",  AboutController.getAboutUsInfo);
aboutRouter.post("/",  AboutController.createAboutUsInfo);
aboutRouter.put("/",  AboutController.updateAboutUsInfo);
aboutRouter.delete("/:id",  AboutController.deleteAboutUsInfo);

module.exports =aboutRouter