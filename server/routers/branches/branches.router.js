const express = require("express");
const BranchesController = require("../../controllers/branches/branches.controller");
const useAuth = require("../../utils/middlewares/useAuth");
const branchesRouter = express.Router();


branchesRouter.get("/", BranchesController.getAllBranches);
branchesRouter.post("/", useAuth, BranchesController.createBranch);
branchesRouter.put("/:id", useAuth, BranchesController.updateBranch);
branchesRouter.delete("/:id", useAuth, BranchesController.deleteBranch);

module.exports = branchesRouter;