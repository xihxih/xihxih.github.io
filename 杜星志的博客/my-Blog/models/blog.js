const mongoose = require('mongoose')
const { Schema } = mongoose
//定义数据结构
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps:true})
//定义数据模型
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog