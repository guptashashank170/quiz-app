const express=require('express');

const router=express.Router();

router.get('/login',(req,res)=>{
    res.render('login',({layout:'login'}));
});


module.exports=router;