# linux命令行基础

    [root@iZbp13qdeitwuc7nytvvqaZ local]
    root:当前登录的用户名
    @:分隔符
    iZbp13qdeitwuc7nytvvqaZ:主机名
    local：当前文件路径
    
    创建目录：
        mkdir (make directory)  filename 
        mkdir -p [dirname]
        -p 确保目录名称存在，不存在就建一个
    创建文件：
        touch filename
    回到根目录
        cd /   或者 cd ~
    查看当前目录内容
        ls
    查看当前绝对路径
        pwd
    递归删除
        rm -rf filename
    替代方法：
        mv 移动文件或目录
    编辑文件:
        vim  具有编辑程序的能力,可以主动的以字体颜色辨别语法的正确性。 1.命令模式 2. 输入模式 3. 底线命令模式
        i: 切换到输入模式,以输入字符
        x: 删除当前光标所在处的字符
        :  切换到底线命令模式,以在最底一行输入命令
        w 保存文件 q 退出程序  
            esc 退出输入模式,切换到命令模式
    查看文件安装路径:
        which node/ which pm2
    wget:
        是一个从网络上自动下载文件的自由工具,支持通过http,https,ftp三个最常见的TCP/IP协议下载。
        所谓自动下载，是指 wget 可以在用户退出系统的之后在继续后台执行，直到下载任务完成
    
    tar 命令:
        tar用来建立,还原备份文件的工具程序。它可以加入,解开备份文件内的文件。
    
# 域名绑定

    域名列表:
        1. 解析 --> 添加记录
            A - 将一个域名志向一个IPV4地址
            主机记录 : www / @ （添加两条）
            记录值: 服务器公网ip地址
        
        二级域名,同样的操作 添加记录。
    
    FiliZilla 连接服务器上传文件  端口: 22 用户名 root
    
    
    SSH是 secure shell 的缩写,SSH为建立在应用层基础上的安全协议。专为远程登陆会话和其他网络服务提供安全性的协议。利用SSH协议可以有效防止远程
    管理过程中的信息泄漏问题。
    
# 安装node

    安装到 /usr/local/src 目录下
    uname -a 
        查看当前系统版本
    pwd
        查看当前目录
    cd ~   或者 cd /
        回到root根目录下
        
    下载node 
    进入node中文网----> 下载 ----> 阿里云镜像 ----> 选择系统对应的安装包
    
        wget https://nodejs.org/dist/v14.14.0/node-v14.14.0-linux-x64.tar.gz  
    
        解压nodejs文件
        tar xvf node-v12.14.0-linux-x64.tar.xz
        
    修改下载的node文件名为 nodejs 
        mv node-v12.14.0-linux-x64 nodejs
        
        rm node-v12.14.0-linux-x64.tar.xz 删除压缩包.
        
    配置环境变量（可以在任意目录下使用node）
        ln -s /usr/local/src/nodejs/bin/node /usr/local/bin
        ln -s /usr/local/src/nodejs/bin/npm /usr/local/bin
     
    可以使用node -v  或者 npm -v 查询当前版本
        
# filezilla工具使用
    
    登录 FileZilla
        主机: ecs公网ip
        用户名：root
        密码：******
        端口：22
    
    上传文件
        此时还无法通过 ip地址进行访问
    
    编辑文件
        vim filename
        i
# 安全组

    安全组 ---》 配置规则 ---》 添加安全组规则
    
    入方向：
        端口范围：80/80
        优先级：1
        授权类型：地址段访问
        授权对象：0.0.0.0/0
        描述：开放80端口
        
    再次配置
        端口范围：3000/9999
        其余选项和上面相同
     
# pm2
    
    PM2 is a daemon process manager that will help you manage and keep your application online.
    
    Installation
        npm install pm2 -g
        npm install pm2@latest -g
    和node一样配置软链
      ln -s /usr/local/nodejs/bin/pm2  /usr/local/bin
      
    常用命令:
        pm2 restart app_name
        pm2 reload app_name
        pm2 stop app_name
        pm2 delete app_name
    
    List managed applications
        list the status of all application managed by pm2:
            pm2 [list|ls|status]
        
    
# Linux安装MongoDB
    
    1. Create an /etc/yum.repos.d/mongodb-org-4.4-repo fiel
        vim /etc/yum.repos.d/mongodb-org-4.4-repo
        编辑:
```js
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
```
    2. install mongodb packages
        sudo yum install -y mongodb-org 
        有新版本时，yum会对包进行升级,为防止意外升级,需要固定包,编辑 /etc/yum.conf文件
        
     exclude=mongodb-org,mongodb-org-server,mongodb-org-shell,mongodb-org-mongos,mongodb-org-tools
    
    3. By default,MongoDB runs using the mongod user account and uses the following default directories:
        /var/lib/mongo (data directory)
        /var/log/mongodb (log directory)
        
    4. 启动mongodb服务
        recent versions of Linux tend to use systemd (which uses the systemctl command),while older versions of Linux 
        tend to use System V init(which use the service command).
    
        检测是使用 systemctl 还是 service命令:
        ps --no-headers -o comm 1  根据返回值使用相应命令:
            systemd : 使用systemctl命令
            init:     使用service命令
    
    5. 
        5.1 sudo systemctl start mongod 
        if you receive an error similar to the following when starting mongod:
            Failed to start mongod.ervice:Unit mongod.service not found.
            
        执行下面的命令后再次使用 上面启动的命令
            sudo systemctl daemon-reload    
        
        5.2 Verify that MongoDB has started successfully.
            sudo systemctl status mongod
            
        5.3 stop mongodb
            sudo systemctl stop mongod
        
        5.4 restart mongodb
            sudo systemctl restart mongod 
            
     Uninstall MongoDB (you must remove the MongoDB applications themselves,the configuration files,and any directories data and logs)
        1. sudo service mongod stop
        2. sudo yum erase $(rpm -qa | grep mongodb-org)   
        3. sudo rm -r /var/log/mongodb
           sudo rm -r /var/lib/mongo
    
    打开云服务27017监听端口
    防火墙:
        systemctl status firewalld  --->查看防火墙状态
        systemctl start firewalld ---> 开启防火墙
        systemctl stop firewalld    ---> 关闭防火墙
        firewall-cmd --zone=public --add-port-27017/tcp --permanent 永久开放27017端口
     
    Localhost Binding by Default
        By default,MongoDB launches with bindIp set to 127.0.0.1,which binds to the localhost network interface.
        This means that the mongod can only accept connections from clients that are running on the same machine.
        Remote clients will not be able to connect to the mongod. 
       
```js
// 记一次启动失败 code=exited,status=14

// 解决方法
sudo chown mongod:mongod /tmp/mongodb-27017.sock
```

## Mongo Shell
    
    run mongo shell without any command-line options to connect to a MongoDB instance running on your localhost with 
    default port 27017
        mongo   
        
        mongo --port 28015 
    
    MongoDB instance on a Remote Host (specify a connection string)
        mongo "mongodb://mongodb0.example.com:28015"  
    
    Or use the command-line option --host and --port
        mongo --host mongodb0.example.com:28015
        mongo --host mongodb0.example.com --port 28015
    
    db : To display the database you are using
    use database : to switch databse,
        
        
    Default configuration filr
        on linux a default /etc/mongod.conf configuration file is included when using a package manager to install mongodb
        
# Nginx

##  Install

    Ping是一个十分好用的TCP/IP工具。它主要的功能是用来检测网络的连通情况和分析网络速度。
        ping ip地址（或绑定的域名）
        
    
    Install the prerequisites:
        sudo yum install yum-utils
        
    To set up the yum repository, create the file named /etc/yum.repos.d/nginx.repo
        vim /etc/yum.repos.d/nginx.repo
```js
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```     
    
    To install nginx, run the following command:
        sudo yum install nginx  
        
    nginx -v 测试nginx安装的版本
    
    查看nginx安装的目录
        rpm -ql nginx
    tips:
        rpm 是linux的rpm包管理工具
        -q 代表询问模式
        -l 代表返回列表
    
    进入 /usr/share/nginx/html 文件 启动nginx 可以通过ip地址访问

    nginx配置文件  
        
        nginx.conf 文件是Nginx总配置文件
        所在目录  /etc/nginx/conf.d
![conf](https://github.com/JayK0720/Front-End/blob/master/134-ECS%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/imgs/nginx.conf.png)
    
        default.conf
        所在目录: /etc/nginx/conf.d/default.conf
![default.conf](https://github.com/JayK0720/Front-End/blob/master/134-ECS%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/imgs/default.conf.png)    

[Install Nginx](http://nginx.org/en/linux_packages.html)

## About Configuration

    nginx has one master process and serval worker processes。 The number worker processes is defined in the configuration
    file and may be fixed for a given configuration or automatically adjusted to the number of available CPU cores.
    
    The way nginx and its modules work is determined in the configuration file。  
    
    
    start | stop | reload

    start:
        第一种方法：nginx
        第二种方法：systemctl start nginx.service
    
    Once nginx is started, it can be controlled by invoking the executable with the -s parameter.
        nginx -s stop   fast shutdown
        nginx -s quit   graceful shutdown
        nginx -s reload reloading the configuration file
        nginx -s reopen reopening the log files.
        
        kill -s QUIT  <master process ID>
        nginx can be controlled with signals.The process ID of the master process is written to the file 
        /usr/local/nginx/logs/nginx.pid by default。
        
    restart:
        Changes made in the configuration file will not be applied until the command to reload configuration is send to nginx
        or it is restarted. reload configuration, execute:
            nginx -s reload
        
    查看端口号开启了：
        netstat -tlnp
    
    For getting the list of all running nginx processes, the ps utillity may be used.
        ps -ax | grep nginx
 
## Configuration File's Structure

    nginx consists of modules which are controlled by directives specified in the configuration file. Directives are divided in to
    simple directives and block directives.
    
    A simple directive consists of the name and parameters separated by spaces and ends with a semicolon(;) 
    A block directive has the same structure as a simple directive。 succrouded by braces({}).      
        
# 错误页面设置和访问权限配置  
    
    配置一个404页面：
    进入 etc/nginx/conf.d文件夹  编辑default.conf文件 

    error_page   404    404_error.html
    :wq 保存退出    
    
    
    禁止某个ip地址访问：
```js
 location / {
    deny   123.9.51.42; // 禁止访问
    allow  45.76.202.231;   
}

location =/img{
    allow all;
}
// 禁止访问后台
location =/admin{
    deny all;
}
```
# 反向代理
    
    访问http://nginx2.jspang.com然后反向代理到jspang.com这个网站。我们直接到etc/nginx/con.d/8001.conf进行修改。
```js
server{
        listen 80;
        server_name nginx2.jspang.com;
        location / {
               proxy_pass http://jspang.com;
        }
}
```
    proxy_set_header:       更改来自客户端的请求头信息
    proxy_connect_timeout:  与后台代理服务器尝试建立连接的超时时间
    
[Nginx文档](http://nginx.org/en/docs/beginners_guide.html)