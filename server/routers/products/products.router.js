
const express = require("express");
const productsRouter = express.Router();

const productsController = require("../../controllers/products/products.controller");
const useAuth = require("../../utils/middlewares/useAuth");

productsRouter.get("/", productsController.getProducts);
productsRouter.post("/", useAuth, productsController.addProduct);
productsRouter.put("/:id", useAuth, productsController.updateProduct);
productsRouter.delete("/:id", useAuth, productsController.deleteProduct);

module.exports = productsRouter;