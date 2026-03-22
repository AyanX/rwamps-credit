const express = require("express");
const statsController = require("../../../controllers/stats/stats.controller");
const useAuth = require("../../../utils/middlewares/useAuth");

const statsRouter = express.Router();

statsRouter.get("/", statsController.getStats); 
statsRouter.put("/", useAuth, statsController.updateStats);


module.exports= statsRouter