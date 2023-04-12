/**********引入模块*********/
//引入第三方express模块：用于构建基于Node的APP实例
const express = require('express')
//引入第三方ejs模块：用于构建App的视图
const ejs = require('ejs')
//引入内部path模块：用于处理构建App过程中的路径
const path = require("path")
//引入第三方mongoose模块：用于处理构建App过程中的路径
const mongoose = require('mongoose')
//引入本地blog模块：用于与MongoDB数据库通信
const Blog = require('./models/blog')

/**********初始化App*********/
//创建app实例（基于服务器的app实例)
const app = express()

// /**********自定义变量*********/
// //变量
const blogName = '我的博客'

// /**********配置App*********/
// //配置视图引擎
app.set('view engine', 'ejs')
// //配置要公开暴露的静态资源
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded())
// /**********连接云数据库*********/
// //云数据库的连接字符串
// const uri = 'mongodb+srv://zhangsan:Zxcvbn123456@zhangsanblog.4t6hj0s.mongodb.net/?retryWrites=true&w=majority'
const uri = 'mongodb://127.0.0.1:27017/zhangsanblog'
// //mongoose.connect(连接字符串)：用于连接数据库，它是一个异步操作，返回一个Promise对象
mongoose.connect(uri)
    //请求成功时，拿到成功的结果值：result（也可写data，名字无所谓)
    .then((result) => {
        //向控制台输出数据库连接成功的提示信息
        console.log('数据库已经连接')
        //调用app的listen方法，监听服务器端口，即监听有没有请求进来，如果有就通知回调函数
        app.listen(3000, () => {
            //向控制台输出服务器启动成功的提示信息
            console.log('服务器已运行在http://127.0.0.1:3000')
        })
    })
    //请求失败时，拿到失败的原因值：err（也可写error，名字无所谓)
    .catch(err => console.log(err))
/*****路由********/
app.get('/',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then(data=>{
        res.render('index',{blogName,title:'首页',blogs:data})
    })
    .catch(err=>{
        console.log(err);
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{blogName,title:'关于'})
})
app.get('/add',(req,res)=>{
    res.render('add',{blogName,title:'添加文章'})
})
//添加数据
app.post('/blogs',(req,res)=>{
    console.log(req.body);
    //创建一条document = new Blog()
    const document = new Blog(req.body)
    //存储服务器储存浏览器发来的表单数据
    document.save()
    .then(data=>{
        res.redirect('/')
    })
    .catch(err=>{
        console.log(err);
    })
})

//删除
app.delete('/blog/:id',(req,res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then(data=>{
        return res.json({redirect:'/'})
    })
    .then(data=>{
        // window.location.href = data.redirect
    })
    .catch(err=>{
        console.log(err);
    })
})

//details单篇博客 请求地址："/details/<%= blog._id%>"
app.get('/details/:id',(req,res)=>{
    //获取动态的值
    console.log(req.params);
    const id = req.params.id
    Blog.findById(id)
    .then(data=>{
        res.render('details',{blogName,title:'首页',blog:data})
    })
    .catch(err=>{
        console.log(err);
    })
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', { blogName, title: '404'})
})
