# courseweb
## bug 记录
- 侧边栏切换课程时，分页栏无法自动跳转到‘1’  如果手动设置current-page属性，分页跳转的样式又失效了。 可能是el-pagination的问题。
- 在无token时直接进入home页面，会触发响应拦截。一个自动加载出发一次。会弹窗多次。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
