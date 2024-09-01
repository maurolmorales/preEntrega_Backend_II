const express = require("express");
const router = express.Router();
const cartsRouter = require("./carts.router.js");
const productsRouter = require("./products.router.js");
const routerView = require('./view.router.js')

router.use("/carts", cartsRouter);
router.use("/products", productsRouter);
router.use("/", routerView);
router.use("*", routerView);

module.exports = router;