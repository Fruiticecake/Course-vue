import router from "@/router/index";
import axios from "axios";
/**
 * 创建实例
 */
const ENV = process.env.NODE_ENV;
const host = ENV === "development" ? "http://127.0.0.1:3000" : "http://119.23.73.9";
const service = axios.create({
  baseURL: host,
  timeout: "3000",
});

/**
 * 请求拦截
 */
service.interceptors.request.use((config) => {
  //console.log(config);
  if (config.url.indexOf("register") < 0 && config.url.indexOf("login") < 0) {
    config.headers.authorization = localStorage.getItem("token");
  }
  return config;
});
/**
 * 响应拦截
 */
service.interceptors.response.use((res) => {

  const data = res.data
  const { code, message } = data;
  //console.log(data)
  if (code === 0) {
    return data;
  } else {
    ElMessage({
      message: message,
      type: "error",
    });
  }
  if (message === "身份认证失败或未进行认证") {
    router.push("/login");
  }
});

/**
 * 封装请求
 */
const request = (options) => {
  if (options.method === "get") {
    options.params = options.data;
  }
  console.log(options)
  return service(options);

};

export default request;
