# linux命令行基础

    [root@iZbp13qdeitwuc7nytvvqaZ local]
    root:当前登录的用户名
    @:分隔符
    iZbp13qdeitwuc7nytvvqaZ:主机名
    local：当前文件路径
    
    创建目录：
        mkdir (make directory)  filename 
        
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
        
# filezilla
    
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
     