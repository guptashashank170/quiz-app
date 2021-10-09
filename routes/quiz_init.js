const express=require('express');
const router=express.Router();

const quiz=require('../models/quiz_schema');

router.post('/new-quiz', async(req,res)=>{
    let new_quiz=quiz(req.body);
    try{
        const response=await new_quiz.save();
        console.log(response);
    }
    catch(err)
    {
        console.log(err);
    }
    res.send("Quiz Served");
});

module.exports=router;