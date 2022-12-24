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

/**
 * 用户登录
 */
router.post("/login", expressJoi(userCheck), userController.loginController);
router.get("/userInfo", userController.userController);

/**
 * 学生用户查询
 */
router.get("/student/list", userController.studentController);

/**
 * 管理员查询
 */
router.get("/admin/list", userController.adminController);

module.exports = router;
