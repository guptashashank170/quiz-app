const mongoose=require('mongoose');

const connectDB=async ()=>{
    try{
        console.log(process.env.MONGO_URL);
        const conn=await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`Mongo DB Connected ${conn.connection.host}`);
    }
    catch(err)
    {
        console.error(err);
        process.exit(1);
    }
}

module.exports=connectDB;