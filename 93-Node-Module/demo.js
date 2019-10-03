/*
* 生成文件夹 包括js images css .html文件
 */
const fs = require("fs");
const path = require("path");
exports.fn = function(programData){
    // ES6对象的解构赋值
    let {name,fileData} = programData;
    fs.access( path.join(__dirname,name),(err) => {
        // 如果查询不到文件，则创建文件
        if(err){
            fs.mkdirSync(name);
            // 在目录下生成文件
            fileData.forEach((value) => {
                let dirname = path.join(__dirname,name,value.name);
                if(value.type === "dir"){
                    fs.mkdirSync(dirname);
                }else{
                    fs.writeFile(dirname,"",(err) => {
                        if(err){
                            console.log(err);
                        }else{
                            console.log("文件创建成功");
                        }
                    })
                }
            })
        }else{
            console.log("文件已经创建成功");
        }
    })
}




