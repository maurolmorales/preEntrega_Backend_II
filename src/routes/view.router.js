const express = require("express");
const routerView = express.Router();

routerView.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", { pageTitle: "RealTimeProducts" });
});

routerView.get("/", (req, res) => {
  res.render("index");
});

routerView.get("*", (req, res) => {
  res.status(404).render("notFound");
});

module.exports = routerView;