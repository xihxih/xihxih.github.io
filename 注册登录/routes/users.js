const express = require('express')
const router = express.Router()

//login get
router.get('/login',(req,res)=>{
    res.render('login')
})
//register get
router.get('/register',(req,res)=>{
    res.render('register')
})

module.exports = router