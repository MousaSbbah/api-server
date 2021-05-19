'use strict';
//server setup and config
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const animalRouter = require('./routes/animal');
const studentRouter = require('./routes/student');
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const app = express();

//middleware functions
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
//Routes 
app.get('/',(req,res)=>{
  res.send('Server Is Working');
})
app.use('/animal',animalRouter)
app.use('/student',studentRouter);
app.use('/wrong',(req,res)=>{
  throw new Error ('wrong')
});

//Errors middleware handler 
app.use('*', notFoundHandler);
app.use(errorHandler);





//Start listening function
function start (port){
  app.listen(port,()=>{
    console.log(`listening at port : ${port}`)
  })
}

module.exports = {
  server : app ,
  start : start
}
