# 安装

    node
    watchman
    XCode: 编译iOS应用所需的工具和环境
    CodoaPods
    
    安装Homebrew
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

    Paste that in a macOS Terminal of Linux shell prompt;
    
    安装node 和 Watchman
    
        Watchman是由Facebook提供的监视文件系统变更的工具。安装此工具可以提高开发时的性能(packager可以快速捕捉文件的变化从而实现实时刷新)。
        brew install node
        
        brew install watchman
        
        
    更新node版本：
        1. 清除node.js 的cache
            sudo npm cache clean -f
        2. 安装n工具
            sudo npm install -g n
        3. 用n工具安装最新版本的node.js
            sudo n stable

## Yarn
    
    Yarn 是Facebook提高的替代npm的工具，可以加速node模块的下载。
    
        npm install -g yarn
    安装完yarn之后 可以使用 yarn 代替npm, yarn 代替npm install命令。用yarn add package_name 代替 npm install package_name;
    
## CocoaPods
    
    CocoaPods是用Ruby编写的包管理器。从0.60版本开始的react native的ios版本需要使用CocoaPods来管理依赖。
    
    sudo gem install cocoapods
    或者:
    brew install cocoapods
    
```js
//  cd ~/.cocoapods/repos 
//  pod repo remove master
//  git clone https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git master
```
    最后进入自己的工程,在自己工程的podFile第一行加上
```js
// source 'https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git'
```
![bug](https://www.jianshu.com/p/7b21254cbd77)

    
    安装好依赖后可以初始化项目：
        npx react-native init AwesomeProject
        
    cd ./AwesomeProject/ios
        pod install
    
    
    
    
    
    
    
    
    
    
    
    