
const express = require("express");
const productsRouter = express.Router();

const productsController = require("../../controllers/products/products.controller");

productsRouter.get("/", productsController.getProducts);
productsRouter.post("/", productsController.addProduct);
productsRouter.put("/:id", productsController.updateProduct);
productsRouter.delete("/:id", productsController.deleteProduct);

module.exports = productsRouter;