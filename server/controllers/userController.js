const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config/jwtSecretKey");
/**
 * 注册接口逻辑
 */

exports.registerController = (req, res) => {
  //用户名或密码判空
  let { userName, password } = req.body;
  if (!userName || !password) {
    return res.send({ code: 1, message: "用户名或者密码不能为空！" });
  }
  const userSelectSql = "select * from user where name=?";
  db.query(userSelectSql, userName, (err, results) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    //判断是否存在用户
    //console.log(results);
    if (results.length > 0) {
      return res.send({ code: 1, message: "该用户已经存在" });
    }
    //用户密码加密
    const bcrypt = require("bcryptjs");
    const passwordB = bcrypt.hashSync(password, 10);
    //生成随机头像
    const imgList = [
      "https://fruiticecake-images.oss-cn-shenzhen.aliyuncs.com/course/%E5%A4%B4%E5%83%8F%20%E5%A5%B3%E5%AD%A9%20%281%29.png",
      "https://fruiticecake-images.oss-cn-shenzhen.aliyuncs.com/course/%E5%A4%B4%E5%83%8F%20%E5%A5%B3%E5%AD%A9%20%282%29.png",
      "https://fruiticecake-images.oss-cn-shenzhen.aliyuncs.com/course/%E5%A4%B4%E5%83%8F%20%E5%A5%B3%E5%AD%A9.png",
      "https://fruiticecake-images.oss-cn-shenzhen.aliyuncs.com/course/%E5%A4%B4%E5%83%8F%20%E7%94%B7%E5%AD%A9%20%281%29.png",
      "https://fruiticecake-images.oss-cn-shenzhen.aliyuncs.com/course/%E5%A4%B4%E5%83%8F%20%E7%94%B7%E5%AD%A9%20%282%29.png",
      "https://fruiticecake-images.oss-cn-shenzhen.aliyuncs.com/course/%E5%A4%B4%E5%83%8F%20%E7%94%B7%E5%AD%A9.png",
    ];
    const num = Math.floor(Math.random() * 6 + 1);
    //用户信息插入
    const userInsertSql = "insert into user (name,pwd,head_img) value (?,?,?)";
    db.query(
      userInsertSql,
      [userName, passwordB, imgList[num]],
      (err, results) => {
        if (err) {
          return res.send({ code: 1, message: err.message });
        }
        res.send({
          code: 0,
          message: "注册成功",
        });
      }
    );
  });
};
/**
 * 登陆接口
 */
exports.loginController = (req, res) => {
  let { userName, password } = req.body;
  const userSelectSql = "select * from user where name=?";
  db.query(userSelectSql, userName, (err, results) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    if (results.length === 0) {
      return res.send({ code: 1, message: "账号不存在，请先注册！" });
    }
    //密码检验
    const comparePWD = bcrypt.compareSync(password, results[0].pwd);
    if (!comparePWD) {
      return res.send({ code: 1, message: "密码错误，请重试！" });
    }
    const user = { ...results[0], pwd: "" };
    const token = jwt.sign(user, jwtSecretKey, { expiresIn: "24h" });

    res.send({ code: 0, message: "登陆成功", token: "Bearer " + token });
  });
};

/**
 * 用户信息查询
 */
exports.userController = (req, res) => {
  //获取token
  const token = req.headers.authorization;
  const userInfo = jwt.verify(token.split("Bearer ")[1], jwtSecretKey);
  //console.log(userInfo);
  res.send({
    code: 0,
    data: { name: userInfo.name, headImg: userInfo.head_img },
  });
};

/**
 * 查询学生用户
 */
exports.studentController = (req, res) => {
  const studentSql = "select * from student";
  db.query(studentSql, (err, results) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    res.send({
      code: 0,
      data: {
        total: results,
      },
    });
  });
};
/**
 * 查询管理员用户
 */
exports.adminController = (req, res) => {
  const adminSql = "select id,name username,realname,phone,email,create_time from user";
  db.query(adminSql, (err, results) => {
    if (err) {
      res.send({ code: 1, message: err.message });
    }
    res.send({
      code: 0,
      data: {
        total: results,
      },
    });
  });
};
