# Mongoose
    
    1. 安装mongoose
        npm install mongoose
    
    2. 引入mongoose并连接数据库
        let mongoose = require("mongoose");             // 引入mongoose
        mongoose.connect('mongodb://localhost:27017/test')    // 连接某个数据库
```js
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true},(err) => {
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
    }
});
```   
    
## Schemas

    Everything in Mongoose starts with a Schema,Each schema maps to a MongoDB collection and defined the shape
    of the documents within that collection.
    
    1. 定义一个schema
```js
let blogSchema = new mongoose.Schema({
    title:String,   // String is shorthand for {type:String}
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
    
    A model is a class with which we constructor document。
    
	Models是从Schema编译来的构造函数.它们的实例就代表着可以从数据库保存和读取documents。从数据库创建和读取
	document的所有操作都是通过model进行的。
	
	Creating a model:

        mongoose.model(modelName,schema);
        
        1. 编译一个model
            var schema = new mongoose.Schema({name:String,size:String});
            var Tank = mongoose.model("tank",schema);
            
        第一个参数是跟model对应的集合(collection)名字的单数形式。Mongoose会自动找到名称是model名字复数形式的collection。
        documents是model的实例。
        
        3. let blog = new Blog({
            
        });
        
        4. blog.save()  // 对象的方法 为动态方法
    
    Ids:
        By default,Mongoose adds an _id property to your schemas。 When you create a new document with the automatically
        added _id property,Mongoose creates a new _id of type ObjectId to your document.
    
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