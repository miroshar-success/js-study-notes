const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/student",{ useNewUrlParser: true },(err)=>{
    if(err){
        console.log(err);
    }
    console.log("数据库连接成功");
    let studentSchema = new mongoose.Schema({
        name:String,
        sex:String,
        Chinese:Number,
        Math:Number,
        English:Number
    });
    let Student = mongoose.model("results",studentSchema);
    /*new Student({
        name:"张三",
        sex:"男",
        Chinese:82,
        Math:77,
        English:90
    }).save();*/
    // 暴露一个函数接口,展示所有学生的信息
    exports.getAllStudent = function(callback){
        Student.find().then((results)=>{
            callback(results);
        });
    }
    // 添加学生信息到数据库
    exports.addInfo = function(studentInfo,callback){
        new Student(studentInfo).save();
        callback("提交成功");
    }
    // 删除学生数据
    exports.removeInfo = function(name,callback){
        /*
        1. 这种方法是先判断是否有学生数据,如果有则删除,没有就返回-1
        Student.findOne({name:name}).then((result) => {
            // 如果找到了则删除该生数据 并返回 提示信息 删除成功
            if(result){
                Student.deleteOne({name:name}).then(()=>{
                    callback("删除成功");
                });
            }else{
                callback(-1);
            }
        })
        */
        // 这种方式是直接删除通过删除方法 返回的对象来判断是否删除了数据
        Student.deleteOne({name}).then((result)=>{
            if(result.deletedCount){
                callback("删除成功");
            }else{
                callback(-1);
            }
        })
    }
    // 重新编辑学生信息
    exports.updateInfo = function(name,data,callback){
        Student.findOne({name}).then((result)=>{
            if(result){
                Student.updateOne({name},{$set:data}).then(()=>{
                    callback("编辑成功");
                })
            }else{
                callback(-1);
            }
        })
    }
    // 查看学生信息
    exports.checkInfo = function(name,callback){
        Student.findOne({name}).then((result)=>{
            if(result){
                console.log(result);
                callback(result);
            }else{
                callback(-1);
            }
        })
    }
});