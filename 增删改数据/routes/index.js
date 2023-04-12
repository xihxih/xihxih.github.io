const express = require("express")
const mongoose = require("mongoose")

const Task = require("../models/task")
const router = express.Router()
//请求根目录
router.get("/", (req, res) => {
    Task.find()
        .then(data => {
            //把数据注入到视图里面
            res.render("index", {data})
        })
        .catch(err => {console.log(err)})
})

module.exports = router
