const express = require("express");
const router = express.Router();
const cartsRouter = require("./carts.router.js");
const productsRouter = require("./products.router.js");
const userRouter = require("./users.router.js");
const routerView = require('./view.router.js')

router.use("/api/carts", cartsRouter);
router.use("/api/products", productsRouter);
router.use("/api/sessions", userRouter);
router.use("/", routerView);
router.use("*", routerView);

module.exports = router;