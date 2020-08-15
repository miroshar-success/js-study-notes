const express = require('express');
const app = express();

app.use(express.static('public'))

app.get('/:number',(req,res) => {
    console.log(req.query);
    console.log(req.params);
    res.send('ok');
})


app.listen(5000,() => {
    console.log('app starting at port 5000')
})