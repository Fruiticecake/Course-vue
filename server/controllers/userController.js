const db = require("../config/db");

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
    console.log(results);
    if (results.length > 0) {
      return res.send({ code: 1, message: "该用户已经存在" });
    }
    //用户密码加密
    const bcrypt = require("bcryptjs");
    const passwordB = bcrypt.hashSync(password, 10);
    //生成随机头像
    const imgList = [
      "https://github.com/Fruiticecake/images/blob/main/course-images/%E5%A4%B4%E5%83%8F%20%E5%A5%B3%E5%AD%A9%20(1).png",
      "https://github.com/Fruiticecake/images/blob/main/course-images/%E5%A4%B4%E5%83%8F%20%E5%A5%B3%E5%AD%A9%20(2).png",
      "https://github.com/Fruiticecake/images/blob/main/course-images/%E5%A4%B4%E5%83%8F%20%E5%A5%B3%E5%AD%A9.png",
      "https://github.com/Fruiticecake/images/blob/main/course-images/%E5%A4%B4%E5%83%8F%20%E7%94%B7%E5%AD%A9.png",
      "https://github.com/Fruiticecake/images/blob/main/course-images/%E5%A4%B4%E5%83%8F%20%E7%94%B7%E5%AD%A9%20(1).png",
      "https://github.com/Fruiticecake/images/blob/main/course-images/%E5%A4%B4%E5%83%8F%20%E7%94%B7%E5%AD%A9%20(2).png",
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
