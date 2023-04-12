const mongoose = require('mongose')
const userSchema = mongosose.schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
},{timestamps:true})
const User = mongoose.model('User',userSchema)
module.export = User
