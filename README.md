# Course-vue
- Gorker管理系统 个人全栈项目
- 框架为 vue3+express+Mysql
- 跨域 cors


# 使用docker部署
- 体验 http://119.23.73.9:3010  版本为2022/12/15
- 前后端分离部署。服务器是centOs，所以单独打包的linux版本
- 前端：docker pull fruiticecake/gorker-vue3-linux:latest
- 服务端：docker pull fruiticecake/gorker-express-linux:latest
## 若需要修改后docker部署
- 要修改courseweb/nginx/default.conf文件中 proxy_pass 后为要部署的服务器地址。
# 本地运行
- 数据库连接用dotenv的全局变量，需自行在根目录下创建.env文件配置相关数据库信息。
# 数据库
- 数据库sql在server文件中。
## ER图

![images](https://fruiticecake-images.oss-cn-shenzhen.aliyuncs.com/%E6%95%B0%E6%8D%AE%E5%BA%93ER%E5%9B%BE.png)

# 界面演示（未更新）
![Snipaste_2022-11-14_01-11-13](https://user-images.githubusercontent.com/85162796/201534654-5aecb0e9-1f26-4e60-9517-14a826567903.png)


![Snipaste_2022-11-14_01-11-42](https://user-images.githubusercontent.com/85162796/201534637-8e0fdbb7-d038-4cf6-8a3b-98e3d5320e3e.png)
