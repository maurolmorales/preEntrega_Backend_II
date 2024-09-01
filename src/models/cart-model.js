const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: {
    type: [ { product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" } } ],
    default: []
  },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["open", "complete", "canceled"],
    default: "open",
  },
});
module.exports = mongoose.model("Cart", cartSchema);
