const db = require("../config/db");

/**
 * 课程查询
 */
exports.listVideo = (req, res) => {
  let { category, page, size } = req.query;
  page = (page - 1) * size;

  const pageSql =
    "select * from video where del=0 and category = ? order by id limit ?,?";
  const totalSql =
    "select count(*) as total from video where del=0 and category = ?";

  db.query(pageSql, [category, Number(page), Number(size)], (err, resPage) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }

    db.query(totalSql, category, (err, resTotal) => {
      if (err) {
        return res.send({ code: 1, message: err.message });
      }
      res.send({
        code: 0,
        data: {
          list: resPage,
          total: resTotal,
        },
      });
    });
  });
};
/**
 * 课程修改
 */
exports.updateVideoById = (req, res) => {
  let { title, price, id } = req.query;
  let updateSql = "update video set ";
  let arr = [];
  if (title && price) {
    updateSql = updateSql + "title=?,price=? where id=?";
    arr = [title, Number(price), Number(id)];
  } else if (title) {
    updateSql = updateSql + "title=? where id=?";
    arr = [title, Number(id)];
  } else if (price) {
    updateSql = updateSql + "price=? where id=?";
    arr = [price, Number(id)];
  }

  db.query(updateSql, arr, (err, results) => {
    if (err) {
      return res.send({ code: 1, message: err, message });
    }
    res.send({ code: 0, message: "修改成功" });
  });
};

/**
 * 删除课程
 */
exports.deleteVideoById = (req, res) => {
  let { id } = req.query;

  let sql = "update video set del=1 where id=?";
  db.query(sql, id, (err, results) => {
    if (err) {
      return res.send({ code: 1, message: err.message });
    }
    res.send({ code: 0, message: "删除成功" });
  });
};
