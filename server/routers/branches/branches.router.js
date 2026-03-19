const express = require("express");
const BranchesController = require("../../controllers/branches/branches.controller");
const branchesRouter = express.Router();


branchesRouter.get("/", BranchesController.getAllBranches);
branchesRouter.post("/", BranchesController.createBranch);
branchesRouter.put("/:id", BranchesController.updateBranch);
branchesRouter.delete("/:id", BranchesController.deleteBranch);

module.exports = branchesRouter;