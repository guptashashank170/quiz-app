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

router.get('/attempt-quiz/:id',ensureAuth,async (req,res)=>{
   
    try{
        const cur_quiz=await quiz.findOne({"_id":req.params.id},{"quiz_name":1,"questions":1,"_id":0});
        res.render("quiz_attempt",{layout:"main",quiz_data:JSON.stringify(cur_quiz)});
    }
    catch(e)
    {
        console.log(e);
        res.render("Error Occured");
    }

});

router.post('/attempt-quiz/:id',ensureAuth,async (req,res)=>{
  
    try{
        const cur_quiz=await quiz.findOne({"_id":req.params.id},{"_id":0,"quiz_name":0});
        console.log(cur_quiz);

    }
    catch(e)
    {
        console.log(e);
    }
    res.send("Ans Submitted");
})


module.exports=router;