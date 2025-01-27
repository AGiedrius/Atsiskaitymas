const express = require("express");
const { signup, login } = require("../controlers/authControler");
const signupValidator = require("../validators/signup");
const validate = require("../validators/validate");
const loginValidator = require("../validators/login");

const router = express.Router();

router.route("/signup").post(signupValidator, validate, signup);
router.route("/login").post(loginValidator, validate, login);

module.exports = router;
