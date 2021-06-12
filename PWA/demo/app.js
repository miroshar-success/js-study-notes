const express = require("express");
const app = express();
/*const player = {
    firstName:'lebron',
    lastName:"james",
    age:35
}*/
app.use(express.static('public'));
/*
app.get("/api/player",(req,res) => {
    console.log("发起请求了");
    res.send(player);
})*/

app.listen(3000,() => {
    console.log('app serve at port 3000');
})