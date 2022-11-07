const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const { courseCheck, updateCheck } = require("../utils/userCheck");
const courseController = require("../controllers/courseController");

router.get("/find", expressJoi(courseCheck), courseController.listVideo);
router.get("/update", expressJoi(updateCheck), courseController.updateVideoById);
module.exports = router;
