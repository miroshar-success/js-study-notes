# mongoDB
	
	基于分布式文件存储的开源数据库系统。将数据存储为一个文档,数据结构由键值(key=>value)对组成,MongoDB文档类似于JSON对象,
	字段值可以包含其他文档,数据及文档数组。
	
    1.下载:
    https://www.mongodb.com/download-center#community
    
    2. 配置环境变量
        mac配置环境变量:
            shift+command+g  输入/usr/local 查找进入安装的目录
    
        cd ~ 在根目录下新建一个文件
            touch .bash_profile  新建一个文件
            
            open .bash_profile 打开文件，并编辑
                export PATH=${PATH}:/usr/local/MongoDB/bin
            保存后，在命令行输入以下代码，使文件生效
                source .bash_profile
                
            再次输入 mondod --version  查询到版本信息即配置成功。
    
    3. 创建一个目录,通过命令行启动MongoDB服务器
        mongod --dbpath <创建的数据文件夹路径>
        mongod --dbpath <创建的数据文件夹路径> --port 端口号 (可以修改端口)
	
	4. 连接MongoDB
		输入 mongo 命令

    常用指令：
    
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
        
    有一些数据库名是保留的，可以直接访问这些有特殊作用的数据库。
        admin: 从权限的角度来看,这是'root'数据库，要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。
        local: 这个数据永远不会被复制,可以用来存储限于本地单台服务器的任意集合。
        config:当mongo用于分片设置时,config数据库在内部使用,用于保存分片的相关信息。
    
    文档的数据结构和JSON基本一致,所有存储在集合中的数据都是BSON格式。是Binary JSON的简称。
    
    
## MongoDB常用函数
    
    增加数据:
    db.collection.insert()  
    
        db.runoob.insert({"name":"菜鸟教程"})
           会打印出: WriteResult({"nInserted":1})   已经插入了一条数据
           
        db.collection.insertOne() 插入一条数据
        db.collection.insertMany() 插入多个文档
    
    tips:
        1. 在Mnogodb中，集合只有在内容插入后才会创建。
        2. show collections 查询当前数据库到集合。
     
    创建集合:
        db.createCollection(name) 
       
    删除数据库:
        use dataBase(数据库名字) 先切换到要删除到数据库:
        db.dropDatabase()
        
    删除集合:    
        db.collection.drop() 
        
    查找数据:
		db.collection.find()        查找对应数据表里的所有数据
        db.collection.findOne({})   找到符合条件的一个数据
    
    删除文档
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
    
