const {Email} = require("../utils/config.js");
const UserModel = require("../models/user.js");

// 登陆接口
const login = (req,res,next) => {
    // 先获取用户名和密码,是否和数据库中保存的用户名一致。
    const {username,password} = req.body;
    const loginMsg =  UserModel.Login({username,password});
    if(loginMsg){
        req.session.username = username;
        res.send({
            msg:"登陆成功",
            status:200
        })
    }else{
        res.send({
            msg:"账号或密码错误",
            status:0
        })
    }
};
// 注册接口
const register = async (req,res,next) => {
    let {username,password,email,verify} = req.body;
    if(email !== req.session.email || verify !== req.session.verify){
        res.send({
            msg:"验证码错误",
            status:0
        });
        return;
    }
    const result = await UserModel.save({
        username,
        password,
        email
    });
    if(result){
        res.send({
            msg:"注册成功",
            status:200
        })
    }else{
        res.send({
            msg:"注册失败",
            status:0
        })
    }
};
// 修改密码接口
const updatePassword = (req,res,next) => {
    const {password,email,verify} = req.body;
    if(email === req.session.email && verify === req.session.verify){
        const result = controller.updatePassword(email,password);
        if(result){
            res.send({
                msg:"修改密码成功",
                status:200
            })
        }else{
            res.send({
                msg:"修改密码失败",
                status:0
            })
        }
    }else{
        res.send({
            msg:"验证码错误",
            status:0
        })
    }
};
// 登出接口
const logout = async (req,res,next) => {
    req.session.username = "";
    res.send({
        msg:"登出成功",
        status:200
    })
};

const getUser = async (req,res,next) => {
    if(req.session.username){
        res.send({
            msg:"获取用户信息成功",
            status:200,
            data:{
                username:req.session.username
            }
        })
    }else{
        res.send({
            msg:"获取信息失败",
            status:0
        })
    }
};
// 获取验证码接口
const verify = async (req,res,next) => {
    const email = req.query.email;
    const verify = Email.verify;
    req.session.verify = verify;
    req.session.email = email;

    const mailOptions = {
        from:"'电影网' 1129594783@qq.com",
        to:email,
        subject:"邮箱验证码",
        text:"验证码:" + verify
    }
    Email.transporter.sendMail(mailOptions,(err)=>{
        if(err){
            res.send({
                msg:"验证码发送失败",
                status:0
            })
        }else{
            res.send({
                msg:"验证码发送成功",
                status:200
            })
        }
    });
};

module.exports = {
    verify,
    login,
    logout,
    updatePassword,
    getUser,
    register
}
