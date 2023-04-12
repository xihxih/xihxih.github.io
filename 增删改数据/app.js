// 引入模块
// 引入内置模块
const path = require("path")
// 引入第三方模块
const express = require("express")
const ejs = require("ejs")
const mongoose = require("mongoose")
// express-ejs-layouts：提供EJS的布局模块(是一个视图模板)
// 使用方法:1.必须在views下创建layout.ejs 2.在lauout.ejs下面必须引用<%- body %>
const expressLayouts = require("express-ejs-layouts")
const exp = require("constants")

// 创建express框架的app实例
const app = express()

// 连接字符串
const dbURI = "mongodb://xihxih:131420gui@127.0.0.1:27017/Blogdb"

//connect 是一个耗时的异步函数
mongoose.connect(dbURI)
    .then(() => {
        console.log('数据库连接成功');
        // 监听端口
        app.listen(3000, () => {
            console.log('服务器开始运行:http://127.0.0.1:3000');
        })

    })
    .catch(err => console.log(err))
// 配置app
// 把public静态资源暴露出去(访问权限:public)
// app.use(express.static(绝对路径))
// path.join：拼接路径
// 注册静态资源
app.use(express.static(path.join(__dirname, 'public')))

// 注册视图模板(配置视图引擎)
app.set('view engine', 'ejs')
// 配置视图模板(注册expressLayouts模板)
app.use(expressLayouts)

// 请求主体信息进行转码express.urlencoded()
app.use(express.urlencoded())
//对请求主题信息进行json处理
app.use(express.json())
app.use('/', require('./routes/index'))
app.use('/todo', require('./routes/todo'))


