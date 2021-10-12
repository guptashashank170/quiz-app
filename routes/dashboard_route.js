const express=require('express');
const router=express.Router();

const quiz=require('../models/quiz_schema');

const {ensureAuth}=require('../utils/auth');

router.get('/dashboard',ensureAuth,async(req,res)=>{
    
    try{
        const quizzes=await quiz.find({},{"_id":1,"quiz_name":1});
        res.render("dashboard",{layout:"main",quizzes:JSON.stringify(quizzes)});   
    }
    catch(e)
    {
        console.log(e);
        res.render("Error Occured");
    }

});

router.get('/attempt-quiz/:id',async (req,res)=>{
   
    try{
        const cur_quiz=await quiz.findOne({"_id":req.params.id},{"quiz_name":1,"questions":1,"_id":0});
        console.log(cur_quiz);
        res.render("quiz_attempt",{layout:"main",quiz_data:cur_quiz});
    }
    catch(e)
    {
        console.log(e);
        res.render("Error Occured");

    }

});


module.exports=router;