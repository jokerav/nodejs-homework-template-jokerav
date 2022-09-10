const express = require("express");
const { basedir } = global;
const ctrl = require(`${basedir}/controllers/auth`);
const { ctrlWrapper } = require(`${basedir}/helpers`);
const {
  auth,
  loginValidation,
  registerValidation,
  upload,
} = require(`${basedir}/middlewares`);
const router = express.Router();

router.post("/register", registerValidation, ctrlWrapper(ctrl.register));

router.post("/login", loginValidation, ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.validateEmail));

router.post("/verify", ctrlWrapper(ctrl.repeatValidateEmail));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
