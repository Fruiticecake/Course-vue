const express = require("express");
const app = express();

/**
 * 解析post请求
 */
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));

/**
 * 跨域请求配置
 */
const cors = require("cors");
app.use(cors());
/**
 * token校验
 */
const expressJwt = require("express-jwt");
const { jwtSecretKey } = require("./config/jwtSecretKey");

app.use(
  expressJwt({ secret: jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: ["/api/v1/user/register", "/api/v1/user/login"],
  })
);
/**
 * 用户相关借口
 */
const userRouter = require("./router/user");
app.use("/api/v1/user", userRouter);

/**
 * 课程相关
 */
const courseRouter = require("./router/course");
app.use("/api/v1/course", courseRouter);

/**
 * 错误中间件
 */
const joi = require("joi");
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    return res.send({
      code: 1,
      message: err.message,
    });
  }
  if (err.name === "UnauthorizedError") {
    return res.send({
      code: 1,
      message: "身份认证失败或未进行认证",
    });
  }
  res.send({
    code: 1,
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("server run in http://127.0.0.1:3000");
});
