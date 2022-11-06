const express = require('express');
const app = express();

/**
 * 解析post请求
 */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:false}));

/**
 * 跨域请求配置
 */
const cors = require('cors');
app.use(cors());
/**
 * 用户相关借口
 */
const userRouter = require('./router/user');
app.use('/api/v1/user',userRouter);


app.listen(3000,()=>{
    console.log('server run in http://127.0.0.1:3000')
})