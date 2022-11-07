const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const { courseCheck } = require("../utils/userCheck");
const courseController = require("../controllers/courseController");
const { useCssModule } = require("vue");

router.get("/find", expressJoi(courseCheck), courseController.listVideo);

module.exports = router;
