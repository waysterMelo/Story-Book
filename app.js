const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan')
const hbs = require('express-handlebars');
const { join } = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose');

dotenv.config({ path: './config/.env'})
connectDB();
const app = express();

//logging
if(process.env.NODE_ENV === 'development'){ app.use(morgan('dev')) }

//body parser
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Passport Config
require('./config/passport')(passport);

//handlebars helpers
const formatDate = require('./helpers/handlebars');

//handlebars
app.engine('handlebars', hbs.engine({ helpers: formatDate, defaultLayout: 'main' })); 
app.set('view engine', 'handlebars');
app.set('views', './views');


//Sessions
app.use(session({
    secret: 'Wayster',
    resave: false,
     saveUninitialized: false,
     store: new MongoStore({ mongoUrl: process.env.MONGO_URI})
}));

//Passporte Middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', require('./routes/index')); 
app.use('/auth', require('./routes/auth')); 
app.use('/stories', require('./routes/stories')); 


//static folder
app.use(express.static(path.join(__dirname, 'public')));


const PORT =  process.env.PORT || 3000; 

app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

app.listen();