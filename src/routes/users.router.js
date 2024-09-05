const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  addUser_controller,
  loginUser_controller,
} = require("../controllers/users.controllers.js");

//registro
router.post(
  "/registro",
  passport.authenticate("registro", {
    session: false,
    failureRedirect: "/api/sessions/error",
  }),
  addUser_controller
);

//login
router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/error",
  }),
  //loginUserJWT_controller
  loginUser_controller
);

//current
router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    res.status(200).json({ user: req.user });
  }
);

// Logout
router.get("/logout", (req, res) => {
  let { web } = req.query;

  // Eliminar la cookie jwt_token
  res.clearCookie("jwt_token"
  , { httpOnly: true}
  );

  if (web) { return res.redirect("/login")}
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({ payload: "Logout exitoso" });
});


module.exports = router;
