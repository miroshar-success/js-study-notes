const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname,"public")));

app.listen(3030,() => {
    console.log("app starting at port 3030");
})