const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.js");

router.post("/login",controller.login);
router.post("/register",controller.register);
router.get("/verify",controller.verify);
router.get("/logout",controller.logout);
router.get("/getUser",controller.getUser);
router.post("/updatePassword",controller.updatePassword);

module.exports = router;
