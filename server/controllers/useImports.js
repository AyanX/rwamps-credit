const {
  productsTable,
  loansTable,
  faqsTable,
  contactBranchesTable,
  aboutUsTable,
  servicesTable,
  messagesTable,
  statsTable,
  testimoniesTable
} = require("../models/schema");

const db = require("../db/db");

module.exports = {
  productsTable,
  contactBranchesTable,
  statsTable,
  aboutUsTable,
  loansTable,
  messagesTable,
  servicesTable,
  testimoniesTable,
  faqsTable,
  db,
};
