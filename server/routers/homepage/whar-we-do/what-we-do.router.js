const express = require("express");
const whatWeDoController = require("../../../controllers/what-we-do/whatWeDo.controller");
const upload = require("../../../utils/middlewares/multer");

const whatWeDoRouter = express.Router();


whatWeDoRouter.get("/", whatWeDoController.getWhatWeDo);

whatWeDoRouter.post("/", upload ,whatWeDoController.createWhatWeDo);

whatWeDoRouter.put("/:id",  upload, whatWeDoController.updateWhatWeDo);

whatWeDoRouter.delete("/:id", whatWeDoController.deleteWhatWeDo);

module.exports = whatWeDoRouter;