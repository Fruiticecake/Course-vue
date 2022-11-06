const db = require("../config/db");

/**
 * 注册接口逻辑
 */

exports.registerController = (req, res) => {
  const sql =
    //'insert into user (name,pwd,head_img) value ("ceshi","666666","https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg");';
    'SELECT * FROM course.user;'
  db.query(sql, (err, result) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    res.send({
        code:0,
        data:'注册成功',
    });
  });
};
