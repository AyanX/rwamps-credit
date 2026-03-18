const {productsTable, loansTable, faqsTable}= require("../models/schema");

const db=require("../db/db")

module.exports = {
    productsTable,
    loansTable,
    faqsTable,
    db
}