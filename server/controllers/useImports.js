const {
  productsTable,
  loansTable,
  faqsTable,
  contactBranchesTable,
  aboutUsTable,
} = require("../models/schema");

const db = require("../db/db");

module.exports = {
  productsTable,
  contactBranchesTable,
  aboutUsTable,
  loansTable,
  faqsTable,
  db,
};
