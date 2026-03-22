const express = require("express");
const whatWeDoController = require("../../../controllers/what-we-do/whatWeDo.controller");
const upload = require("../../../utils/middlewares/multer");
const useAuth = require("../../../utils/middlewares/useAuth");

const whatWeDoRouter = express.Router();


whatWeDoRouter.get("/", whatWeDoController.getWhatWeDo);

whatWeDoRouter.post("/", useAuth, upload, whatWeDoController.createWhatWeDo);

whatWeDoRouter.put("/:id", useAuth, upload, whatWeDoController.updateWhatWeDo);

whatWeDoRouter.delete("/:id", useAuth, whatWeDoController.deleteWhatWeDo);

module.exports = whatWeDoRouter;