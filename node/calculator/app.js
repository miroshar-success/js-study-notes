const express = require('express');
const app = express();
const path = require('path');
app.set('view engine','ejs');

app.use(express.static(
    path.join(__dirname,'./public')
))

const calculatorRoute = require('./router/calculator.js');
app.use('/',calculatorRoute);

app.listen(3001,() => {
    console.log('app starting at port 3001');
})