# HTML5

    调用视频设备 navigator.mediaDevices.getUserMedia()
    
[mediaDevices.getUserMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)

    前端路由: hash路由和history路由:
        重要的方法： history.go()/history.back()/history.forward()
        
                    history.pushState(state,title,url);
                    history.replaceState(state,title,url);
                    
                 onpopstate  会监听 go()/back()/forward()操作
         
                 window.onhashchange = function(){}     // 监听hash值改变,可以通过location.hash 获取或设置
                 
[window.location](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)
[window.history](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)