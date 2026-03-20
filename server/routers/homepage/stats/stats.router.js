const express = require("express");
const statsController = require("../../../controllers/stats/stats.controller");

const statsRouter = express.Router();

statsRouter.get("/", statsController.getStats); 
statsRouter.put("/", statsController.updateStats);


module.exports= statsRouter