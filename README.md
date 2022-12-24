# Course-vue
- Gorker管理系统 个人全栈项目
- 框架为 vue3+express+Mysql
- 跨域 cors

![Snipaste_2022-11-14_01-11-13](https://user-images.githubusercontent.com/85162796/201534654-5aecb0e9-1f26-4e60-9517-14a826567903.png)


![Snipaste_2022-11-14_01-11-42](https://user-images.githubusercontent.com/85162796/201534637-8e0fdbb7-d038-4cf6-8a3b-98e3d5320e3e.png)

### 项目整体项目目录

前端：

> courseweb
> ├── README.md
> ├── auto-import.d.ts 
> ├── babel.config.js
> ├── components.d.ts
> ├── jsconfig.json
> ├── package-lock.json  
> ├── package.json
> ├── public
> │   ├── index.html
> │   └── logo.png
> ├── src
> │   ├── App.vue
> │   ├── api
> │   │   └── index.js
> │   ├── assets
> │   │   ├── bg3.jpg
> │   │   └── logo.png
> │   ├── common
> │   │   └── base.css
> │   ├── components
> │   │   ├── clientAside.vue
> │   │   ├── clientFooter.vue
> │   │   ├── clientHeader.vue
> │   │   ├── clientMain.vue
> │   │   ├── clientTable.vue
> │   │   ├── courseEdit.vue
> │   │   └── pagination.vue
> │   ├── main.js
> │   ├── router
> │   │   └── index.js
> │   ├── utils
> │   │   ├── eventBus.js
> │   │   ├── request.js
> │   │   └── text.js
> │   └── views
> │       ├── clientHome.vue
> │       ├── clientLogin.vue
> │       └── clientRegister.vue
> └── vue.config.js

服务端

> Server
> ├── app.js
> ├── config
> │   ├── db.js
> │   └── jwtSecretKey.js
> ├── controllers
> │   ├── courseController.js
> │   ├── replayDelete.js
> │   └── userController.js
> ├── index.html
> ├── package-lock.json
> ├── package.json
> ├── router
> │   ├── course.js
> │   └── user.js
> └── utils
>     └── userCheck.js
