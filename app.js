const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan')
const hbs = require('express-handlebars');
const { join } = require('path');

dotenv.config({ path: './config/.env'})

connectDB();

const app = express();

//logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev')) 
}

//handlebars
app.engine('handlebars', hbs.engine()) 
app.set('view engine', 'handlebars')
app.set('views', './views');


//routes
app.use('/', require('./routes/index')) 


//static folder
app.use(express.static(path.join(__dirname, 'public'))) 


const PORT =  process.env.PORT || 3000; 

app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

app.listen();