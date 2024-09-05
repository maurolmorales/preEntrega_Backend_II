const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth.js");

const {
  getAllProducts_controller,
  getOneProduct_controller,
  createProduct_controller,
  updateOneProduct_controller,
  deleteOneProduct_controller,
} = require("../controllers/product-controller.js");

router.get("/", getAllProducts_controller);

router.get("/:pid", getOneProduct_controller);

router.post("/", createProduct_controller);

router.patch("/:pid", updateOneProduct_controller);

router.delete("/:pid", deleteOneProduct_controller);

module.exports = router;
