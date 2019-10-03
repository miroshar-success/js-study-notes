# mongoDB
	
	基于分布式文件存储的开源数据库系统。将数据存储为一个文档,数据结构由键值(key=>value)对组成,MongoDB文档类似于JSON对象,
	字段值可以包含其他文档,数据及文档数组。
	
    1.下载:
    https://www.mongodb.com/download-center#community
    
    2. 配置环境变量
    3. 创建一个目录,通过命令行启动MongoDB服务器
        mongod --dbpath <创建的数据文件夹路径>
        mongod --dbpath <创建的数据文件夹路径> --port 端口号 (可以修改端口)
	
	4. 连接MongoDB
		输入 mongo 命令

    常用指令
        show dbs:
            列出所有的数据库
        use DATABASE_NAME   
            连接某个数据库,如果数据库不存在,则创建数据库，否则切换到指定数据库(插入数据后才会显示)
        db
            显示当前数据库对象或集合
            
## MongoDB概念解析

    在mongodb中基本的概念是文档,集合,数据库
    
        database        数据库
        collection      数据库表/集合
        document        数据记录行/文档
        field           数据字段/域
        index           索引
        primary key     主键
        
## MongoDB常用函数
       
    增加数据:
    db.collection.insert()  插入的数据必须是json数据格式
    db.runoob.insert({"name":"菜鸟教程"})
       会打印出: WriteResult({"nInserted":1})   已经插入了一条数据
    
    查找数据:
		db.collection.find() 查找对应数据表里的所有数据
    
    查找一条数据
    db.collection.find({})      找到符合条件的数据
    db.collection.findOne({})   找到符合条件的一个数据
    
    删除数据
    db.collection.remove({})    删除符合条件的数据
    
    删除一条数据
    db.collection.remove({},1)  删除一条数据
    
    修改数据
        // 前面先找到符合条件的数据,$set后为要修改的数据
        // 匹配到的数据 修改一条数据
    db.collection.update({},{$set:{}})
    
    修改多条匹配的数据 在后面添加一条属性 multi:true
    db.collection.update({},{$set:{}}{multi:true})
    
    tips
    1. MongoDB的默认数据库为test,如果没有创建新的数据库,集合将存放在test数据库中。
    2. 在MongoDB中,集合只有在内容插入之后才会创建。创建集合(数据表)后要再插入一个文档(记录),集合才会真正创建。
    
# Mongoose
    
    1. 安装mongoose
        npm install mongoose
    
    2. 引入mongoose并连接数据库
        let mongoose = require("mongoose");             // 引入mongoose
        mongoose.connect('mongodb://localhost:27017/test')    // 连接某个数据库
```js
mongoose.connect("mongodb://localhost:27017/test",{newNewUrlParser:true},(err)=>{
	if(err){
		console.log(err);
	}else{
		console.log("数据库连接成功");
	}
})
```   

## Schemas

    Mongoose的一切始于Schema,每个Schema都会映射到一个 Mongodb collection,并定义这个collection里的文档构成。

    1. 定义一个schema
```js
let blogSchema = new mongoose.Schema({
    title:String,
    author:String,
    body:String,
    comments:[{body:String,data:Date}],
    data:{type:Date,defaule:Date.noe},
    hidden:Boolean,
    meta:{
        votes:Number,
        favs:Number
    }
})
```
	document里每个属性的类型都会被转换为在blogSchema里定义对应的SchemaType。允许使用的SchemaTypes有:
		String
		Number
		Date
		Buffer
		Boolean
		Mixed
		ObjectId
		Array

## Models

	Models是从Schema编译来的构造函数.它们的实例就代表着可以从数据库保存和读取documents。从数据库创建和读取
	document的所有操作都是通过model进行的。
	
	1. 编译一个model
		var schema = new mongoose.Schema({name:String,size:String});
		var Tank = mongoose.model("tank",schema);
		
	第一个参数是跟model对应的集合(collection)名字的单数形式。Mongoose会自动找到名称是model名字复数形式的collection。
	documents是model的实例。
    
    3. let blog = new Blog({
		
    });
    
    4. blog.save()  // 对象的方法 为动态方法
    
    
### 查找数据:

    1. 传入callback参数,操作会被立即执行
    2. 不传callback参数,Query的一个实例被返回，有一个.then方法
    
    tips: Mongoose 中每一处查询，被传入的回调函数都遵循 callback(error, result) 这种模式
    
    findOne()   查询单个文档
    find()      查询符合条件的所有数据
	count()		文档数量
	update()	被修改的文档数量
    
### 删除数据

    Model.deleteOne 
    返回一个对象 
    { n: 1, ok: 1, deletedCount: 1 }   
    
    Model.deleteMany
    删除多条匹配的数据
    
### 修改数据
    
    Model.updateOne(query,{$set:{}},callback)
        { n: 1, nModified: 1, ok: 1 }
    
    更新多条数据
    Model.updateMany(query,{$set:{}},callback)