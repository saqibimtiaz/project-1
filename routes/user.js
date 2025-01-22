const express = require("express");

const router = express.Router();
const wrapasync = require("../utils/wrapasync");
// const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const {
  signup,
  signupForm,
  loginForm,
  login,
  logout,
} = require("../controller/users.js");
router.get("/signup", signupForm);

router.post("/signup", wrapasync(signup));
router.get("/login", loginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  login
);

router.get("/logout", logout);

module.exports = router;
