const express = require('express');
const app = express();
const fs = require('fs');
const studentRoute = require('./router/req.js');
const playerRoute = require('./router/res.js');
const bodyRoute = require('./router/body.js');

app.use('/api',studentRoute);
app.use('/api',playerRoute);
app.use('/api',bodyRoute);

app.get('/info',(req,res) => {
    res.set('Content-Type','text/html');
    fs.readFile('./public/info.html',(err,data) => {
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    })
})

app.listen(5000,() => {
    console.log('app starting at port 5000');
})

