const express = require("express");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const {
  auth,
  loginValidation,
  registerValidation,
} = require("../../middlewares");
const router = express.Router();

router.post("/register", registerValidation, ctrlWrapper(ctrl.register));

router.post("/login", loginValidation, ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
