import router from "@/router/index";
import axios from "axios";
/**
 * 创建实例
 */
const ENV = process.env.NODE_ENV;
const host = ENV === "development" ? "http://127.0.0.1" : "http://119.23.73.9";
const service = axios.create({
  baseURL: host,
  timeout: "3000",
});

/**
 * 封装请求
 */
const request = (options) => {
  if (options.method === "get") {
    options.params = options.data;
  }
  return service(options);
};


