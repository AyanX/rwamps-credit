
// /api/loans/1
const LoansController = require("../../controllers/Loans/Loans.controller");
const express = require("express");
const loansRouter = express.Router();

loansRouter.post("/", LoansController.createLoan);
loansRouter.get("/", LoansController.getAllLoans);
loansRouter.put("/:id", LoansController.updateLoan);
loansRouter.delete("/:id", LoansController.deleteLoan);

module.exports = loansRouter;