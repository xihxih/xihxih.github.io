const express = require("express")
const mongoose = require("mongoose")
const Task = require("../models/task")
const router = express.Router()

//2添加任务请求
router.post("/add", (req, res) => {
    // 表单数据被绑定在请求头的主体（body）里面
    // 注意：网络间只能传输
    // console.log(req.body);//成功拿到数据 后要做的三件事：
    // 1.处理数据:Task表示数据库中的表（所以的document的集合）
    // 创建一个新数据
    const newTask = new Task(req.body)
    newTask.save()
        .then(data => {
            //处理成功 返回成功的结果=>document
            console.log(data);
            res.redirect('/')
        })
    // 2.设置渲染
    // 3.把数据注入到视图里面
    // res.render("index",{data:data})
})
//3任务删除请求
router.get("/delete/:_id", (req, res) => {
    console.log(req.params);
    // res.render("index")
    // 1.处理数据
    Task.findByIdAndDelete(req.params)
        .then(() => {
            console.log('删除数据成功');
            res.redirect('/')

        })
        .catch(err => console.log(err))
    // Task.findByIdAndDelete({id:''})
    // 2.设置渲染（对于删除任务无需数据）
    // 3.注入数据（对于删除任务无需数据）
})
//4任务编辑请求
router.put("/update/:_id", (req, res) => {
    const {_id} = req.params
    console.log(_id);
    console.log(req.body);
    Task.findByIdAndUpdate(_id,req.body)
    .then(data=>{
        console.log('修改数据成功');
        return res.json({redirect:'/'})
    }) 
    .catch(err=>{
        console.log(err);
    })
})
//路由模板导出
module.exports = router