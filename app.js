const express=require('express');
const dotenv=require('dotenv');
const path=require('path');
const exphbs=require('express-handlebars');
const passport=require('passport');
const session=require('express-session');

const register_route=require('./routes/registration');

dotenv.config({path:"./config/config.env"});

const PORT=process.env.PORT || 5000;

const connectDB=require('./config/db');
connectDB();

const morgan = require('morgan');

const index_route=require('./routes/index');
const login_route=require('./routes/login');
const quiz_register=require('./routes/quiz_init');

const User=require('./models/user_schema');

const passport_initialize=require('./utils/passport');
passport_initialize(passport,email=>User.findOne({email:email})
,id=>User.findOne({id:id}));

const app=express();

app.use(express.static(path.join(__dirname,'public')));
app.engine('.hbs',exphbs({ defaultLayout:'main',extname:'.hbs'}));
app.set('view engine','.hbs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

if(process.env.NODE_ENV=="devlopment")
app.use(morgan('dev'));

app.use(session({
    secret:"Fuck Off",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/auth/login',passport.authenticate('local',{
successRedirect:'/dashboard',
failureRedirect:'/'
}));

app.use(index_route);
app.use(register_route);
app.use(login_route);
app.use(quiz_register);

app.use((req,res,next)=>{
    console.log(req.session);
    next();
})

app.listen(PORT,()=>{
    console.log(`Server Is Running at PORT ${process.env.NODE_ENV} mode ${PORT}`);
})
