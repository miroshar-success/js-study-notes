# mongoDB
	
	基于分布式文件存储的开源数据库系统。将数据存储为一个文档,数据结构由键值(key=>value)对组成,MongoDB文档类似于JSON对象,
	字段值可以包含其他文档,数据及文档数组。
	
	Mac安装mongodb
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
                    
                再次输入 mongod --version  查询到版本信息即配置成功。
        
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
    
# MongoDB Node Driver

    The official MongoDB Node.js driver allows Node.js applications to connect to MongoDB and work with 
    data. The driver features and asynchronous API  which allows you to access method return values through 
    Promises or specify callbacks to access them when communicatin with MongoDB
    
    install:
        npm install mongodb -S
        
    usage:
```js
const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url,{useUnifiedTopology:true});

async function run(){
    try{
        await client.connect();
        const database = client.db('nba');
        const collection = database.collection('players');
        
        const result = await collection.insertOne({firstName:'kyrie',lastName:'irving',age:28})
        console.log(result);
    }finally{
        await client.close();
    }

}
run().catch(err => console.log(err));
```

# Authentication

    Create a user administrator first, then create additional users.Create a unique MongoDB user for each
    person/application that accesses the system.
    
    Follow the principle of least privilege: A user can have privileges accross different databases.If a user
    requires privileges on multiple databases,create a single user with roles that grant applicable database
    privileges instead of creating the user multiple times in different databases.
    
    Inherited Privileges
        A role created on the admin database can inherit privileges from roles in any database.
        
    Users and Roles
        You can assign roles to users during the user creation. You can alos update existing users to grant or revoke
        roles。
    
    Note: The first user created in the database should be a user administrator who has the privileges to manage
    other users。
    
## Create the user administrator
    
    User Administrator : With access control enabled,ensure you have a user with userAdmin or userAdminAnyDatabase
        role in the admin database.This user can administrate user and roles such as: create users,
        grant or revoke from users, and create or modify customs roles.
```js
// create the user administrator.
use admin // 切换到admin数据库
db.createUser(
  {
    user:"root",
    pwd:passwordPrompt(),
    roles:[{role:"userAdminAnyDatabase",db:"admin"},"readWriteAnyDatabase"]
  }
)
```
    db.auth(username,password);  Connect and authenticate as the user administrator.
    
    或者使用mongo shell
        mongo --port port --authenticationDatabase "admin" - u username -p
        Enter your password when prompted.
    
    返回 1  表示身份认证成功

## Create additional users as needed

```js
use test  
db.createUser(
  {
    user: "myTester",
    pwd:  passwordPrompt(),   
    roles: [ { role: "readWrite", db: "test" },
             { role: "read", db: "reporting" } ]
  }
)
```
    disconnect the mongo shell and reconnect. 
    
## Built-In Roles

    Database User Roles
        Every database includes the following client roles: read readWrite
        
        read: 
            Provides the ability to read data on all non-system collections.
        readWrite: 
            Provides all the privileges of the read role plus ability to modify data on non-system
            collections.   
    

    Database Administration Roles:
        Every database includes the following database administration roles:
        
        dbAdmin:
            Provides the ability to perform administrative tasks such as schema-related tasks,indexing,and 
            gathering statics,
        
        userAdmin:
            Provides the ability to create and modify roles and users on the current database.            
        
    All-Database Roles:

        The follwing roles are available on the admin database and provide privileges which apply to all databases
        except local and config.
       
       readAnyDatabase
       readWriteAnyDatabase
       userAdminAnyDatabase
       dbAdminAnyDatabase     

## Manage Users and Roles

    To create a new role, use the db.createRole() methods, specifying the privileges in the privileges array 
    and the inherited roles in the roles array。
    
    MongoDB uses the combination of the database name and the role name to uniquely define a role.
    Each role is scoped to the database in which you create the role,but MongoDB stores all role information in the
    admin.system.roles collection in the admin database
    
    
    Revoke a Role:
        db.revokeRolesFromUser() 
    This example operation removes the read role on the blog database from the test user.
```js
db.revokeRolesFromUser("test",[{role:"read",db:"blog"}])
```            

    Grant a Role
        db.grantRolesToUser() 
    the following operation grants the test user the readWrite on the blog database:   
```js
db.grantRolesToUser('test',[{role:"readWrite",db:'blog'}])
```            

    Modify the password for an existing user:
        pass the user's username and the new password to the db.changeUserPassword() method.
        
        db.changeUserPassword('test','test123');    已将test用户的密码更改。
    
    View a User's Roles:
        db.getUser('test');
        
    View a Role's Privileges:
        db.getRole('read',{showPrivileges:true})














