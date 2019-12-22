
# axios
    
    特性:
        1. 从浏览器中创建XMLHttpRequest
        2. 从node.js创建http请求
        3. 支持Promise API
        4. 拦截请求和响应
        5. 转换请求数据和响应数据
        6. 取消请求
        7. 自动转换JSON数据
            
    配置默认值:
        
        axios.defaults.baseURL = 'https://api.example.com';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        
        
    拦截器
        // 请求拦截器
        axios.interceptors.request.use(function(config){
            return config;
        })
        
        // 响应拦截器
        axios.interceptors.response.usr(function(response){
            return response.data.result
        })