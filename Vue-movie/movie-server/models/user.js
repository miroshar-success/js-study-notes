const mongoose = require("mongoose");
mongoose.set("useCreateIndex",true);
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:{unique:true}
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        index:{unique:true}
    },
    date:{
        type:Date,
        default:Date.now()
    }
});
let UserModel = mongoose.model("users",userSchema);
UserModel.createIndexes();
// 保存用户注册数据
let save = (data) => {
    var user = new UserModel(data);
    return user.save().then(()=>{
        return true;
    }).catch(()=>{
        return false;
    })
}


// 登陆,查询用户信息,如果信息匹配则登陆成功,否则提升账户或密码错误
const Login = (data) =>{
    return UserModel.findOne(data,(err,result)=>{
        if(err){
            return false;
        }else{
            return true;
        }
    })
}
// 修改用户密码
const changePassword = (email,password) => {
    return UserModel.updateOne({email},{$set:{password}})
        .then(()=>{
            return true;
        })
        .catch(()=>{
            return false;
        })
}
module.exports = {
    save,
    Login,
    changePassword
}

