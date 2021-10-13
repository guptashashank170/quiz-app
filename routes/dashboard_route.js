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
        const cur_quiz=await quiz.findOne({"_id":req.params.id},{"_id":0});
        let quiz_questions=cur_quiz.questions;

        let counter=1;
        let score=0;
        quiz_questions.forEach(question=>{
            if(`q${counter}` in req.body)
            {
                let option=req.body[`q${counter}`];
                if(question[`option_${option[1]}`]==question.ans)
                score++;
                counter++;
            }
        });
        let quiz_link=`/attempt-quiz/${req.params.id}`;
        score=((score/(counter-1))*100).toPrecision(4);
        res.render("viewscore",{score:score,quiz_name:cur_quiz.quiz_name,quiz_link});

    }
    catch(e)
    {
        console.log(e);
        res.render("Error Occured");

    }
})


module.exports=router;