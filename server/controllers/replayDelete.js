const db = require("../config/db");
/**
 * 恢复所有删除的课程
 */

 const replayDelete = () => {
  let sql = "update video set del=0";
  db.query(sql,(err, results) => {
    if(err){
        console.log(err.message)
    }else{
        console.log({ code: 0, message: "恢复成功" })
    }
  });
};
replayDelete()