const express = require("express");
const app = express();
const appData = require("./data.json");
const {goods,seller,ratings} = appData;

const router = express.Router();

router.get("/seller",function(req,res){
	res.json({
		msg:200,
		seller,
	})
})

router.get("/goods",function(req,res){
	res.json({
		msg:200,
		goods,
	})
})

router.get("/ratings",function(req,res){
	res.json({
		msg:200,
		ratings
	})
})

app.use("/api",router);

app.listen(3000);

console.log("运行在3000端口");
