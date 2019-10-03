const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// 连接数据库的配置
const Mongoose = {
	url:"mongodb://localhost:27017/movie",
	connect(){
		mongoose.connect(this.url,{useNewUrlParser:true},(err)=>{
			if(err){
				console.log(err);
				return;
			}
			console.log("数据库连接成功");
		})
	}
}

// 邮箱验证配置
const Email = {
    config:{
        service:"qq",
        secureConnection:true,
        post:465,
        auth:{
            user:"1129594783@qq.com",
            pass:"rjikyurtfheoifie"
        }
    },
    get transporter(){
        return nodemailer.createTransport(this.config);
    },
    get verify(){
        return Math.random().toString().substring(2,6);
    }
}

module.exports = {
	Mongoose,
    Email
}
