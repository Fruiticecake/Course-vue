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
