
// /api/loans/1
const LoansController = require("../../controllers/Loans/Loans.controller");
const express = require("express");
const useAuth = require("../../utils/middlewares/useAuth");
const loansRouter = express.Router();

loansRouter.post("/", useAuth, LoansController.createLoan);
loansRouter.get("/", LoansController.getAllLoans);
loansRouter.put("/:id", useAuth, LoansController.updateLoan);
loansRouter.delete("/:id", useAuth, LoansController.deleteLoan);

module.exports = loansRouter;