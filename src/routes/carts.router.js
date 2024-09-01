const express = require("express");
const router = express.Router();

const {
  getAllCarts_controller,
  getOneCart_controller,
  addProdToCart_controller,
  closeCart_controller,
  delProdToCart_controller,
  emptyCart_controller,
} = require("../controllers/carts-controllers.js");

router.get("/", getAllCarts_controller);

router.get("/:cid", getOneCart_controller);

router.post("/:pid", addProdToCart_controller);

router.put("/:cid", closeCart_controller);

router.delete("/:cid/products/:pid", delProdToCart_controller);

router.delete("/:cid", emptyCart_controller);

module.exports = router;