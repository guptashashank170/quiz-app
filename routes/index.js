const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render("home",{layout:"login"});
});

router.get('/auth/register',(req,res)=>{
    res.render('register',{layout:"login"});
});

router.get('/auth/login',(req,res)=>{
    res.render('login',{layout:"login"});
});

router.get('/dashboard',(req,res)=>{
    res.render("dashboard");
})

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

module.exports=router;