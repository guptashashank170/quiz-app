const express=require('express');
const router=express.Router();

const {ensureAuth}=require('../utils/auth');

router.get('/dashboard',ensureAuth,(req,res)=>{
    res.render("dashboard",{layout:"main"});
});

module.exports=router;