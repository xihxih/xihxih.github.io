//先引入内部模块
const path = require('path')
//在引入第三方模块
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const ejs = require('ejs')
const mongoose = require('mongoose')
//最后引入本地模块
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

//创建app实例
const app = express()
//创建路由
const router = express.Router()
//配置服务器
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`服务器已运行在${PORT}`))

//配置数据库
const dbURI = require('./config/keys').dbURI
mongoose.connect(dbURI)
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err))

//配置app
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressLayouts)
app.set('view engine', 'ejs');
// app.set('layout', 'my-default-layout')
//配置路由：1.基本路由 2.users路由
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
// app.use('/users', require('./routes/users'))