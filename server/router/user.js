const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const expressJoi = require("@escook/express-joi");
const { userCheck } = require("../utils/userCheck");
/**
 * 用户注册
 */
router.post(
  "/register",
  expressJoi(userCheck),
  userController.registerController
);

module.exports = router;
