const express=require('express');
const router=express.Router();

const quiz=require('../models/quiz_schema');

const {ensureAuth}=require('../utils/auth');

router.get('/dashboard',ensureAuth,async(req,res)=>{
    
    try{
        const quizzes=await quiz.find({},{"_id":1,"quiz_name":1});
        console.log(quizzes);
        res.render("dashboard",{layout:"main",quizzes:JSON.stringify(quizzes)});
        
    }
    catch(e)
    {
        console.log(e);
    }

});


module.exports=router;