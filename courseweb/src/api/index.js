import request from "@/utils/request";

/**
 * 注册接口
 */
export const getRegister = (data) => {
  //console.log(data)
  return request({ method: "post", url: "/api/v1/user/register", data });
};
/**
 * 登陆接口
 */
export const getLogin = (data) => {
  return request({ method: "post", url: "/api/v1/user/login", data });
};

/**
 * 用户信息接口
 */

export const getUserInfo = () => {
  return request({ method: "get", url: "/api/v1/user/userInfo" });
};
/**
 * 学生信息接口
 */

export const getStudentInfo = () => {
  return request({ method: "get", url: "/api/v1/user/student/list" });
};
/**
 * 管理员信息接口
 */

export const getAdminInfo = () => {
  return request({ method: "get", url: "/api/v1/user/admin/list" });
};
/**
 * 列表数据接口
 */
export const getCourse = (data) => {
  return request({ method: "get", url: "/api/v1/course/find", data });
};
/**
 * 课程修改接口
 */
export const changeCourse = (data) => {
  return request({ method: "get", url: "/api/v1/course/update", data });
};
/**
 * 课程删除接口
 */
export const deleteCourse = (data) => {
  return request({ method: "get", url: "/api/v1/course/delete", data });
};
