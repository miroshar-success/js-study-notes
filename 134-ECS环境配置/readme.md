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
        
# 安装node

    安装到 /usr/local/ 目录下
    uname -a 
        查看当前系统版本
    pwd
        查看当前目录
    cd ~
        回到root根目录下
        
    下载node 
    wget https://npm.taobao.org/mirrors/node/v12.14.0/node-v12.14.0-linux-x64.tar.xz
    
        解压
        tar -xvf node-v12.14.0-linux-x64.tar.xz
        
    修改下载的node文件名为 nodejs 
        mv node-v12.14.0-linux-x64 nodejs
        
    配置环境变量
        ln -s /usr/local/nodejs/bin/node /usr/local/bin
        ln -s /usr/local/nodejs/bin/npm /usr/local/bin
        
    删除文件夹
        rm -rf filename
        
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

    npm install pm2 -g
    和node一样配置软链
      ln -s /usr/local/nodejs/bin/pm2  /usr/local/bin
      
    pm2 start node-app.js

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
        
        
# Nginx配置

    Ping是一个十分好用的TCP/IP工具。它主要的功能是用来检测网络的连通情况和分析网络速度。
        ping ip地址（或绑定的域名）
        
    1. yum -y install gcc gcc-c++ autoconf pcre-devel make automake
    2. yum -y install wget httpd-tools vim
    
    Install the prerequisites:
        sudo yum install yum-utils
        
    To set up the yum repository, create the file named /etc/yum.repos.d/nginx.repo
    
        vim /etc/yum.repos.d/nginx.repo
        
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
        
    esc 键 :wq保存
    
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

# config
    
    nginx.conf 文件是Nginx总配置文件
![conf](https://github.com/JayK0720/Front-End/blob/master/134-ECS%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/imgs/nginx.conf.png)

    default.conf
![default.conf](https://github.com/JayK0720/Front-End/blob/master/134-ECS%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/imgs/default.conf.png)    
    
    
    
# start | stop | restart

    start:
        第一种方法：nginx
        第二种方法：systemctl start nginx.service
        
    stop:
        1. nginx -s quit    
        2. systemctl stop nginx.service
        3. killall nginx   杀死所有进程
        4. nginx -s stop
        
    restart:
        systemctl restart nginx.service
        
        
    重载配置文件：
        在重新编写或者修改Nginx的配置文件后,操作一下重新载入！
        nginx -s reload
    
    查看端口号开启了：
        netstat -tlnp
  
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
    
[Nginx文档](http://nginx.org/en/linux_packages.html#RHEL-CentOS)