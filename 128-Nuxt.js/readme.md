# Nuxt.js

	安装:
	npx create-nuxt-app <项目名>
	
	cd <project-name> && npm run dev  默认在localhost:3000上运行
	
	可以修改服务配置:
		1. 在package.json中 新增配置:
```js
// package.json文件
"config":{
	"nuxt":{
		"host":"127.0.0.1",
		"port":"3001"
	}
}
```

# 路由

	Nuxt.js 依据pages 目录结构自动生成 vue-router模块的路由配置。 在页面之间使用路由,建议使用 <nuxt-link>标签。
	
	动态路由:
	在Nuxt.js里面定义带参数的动态路由,需要创建对应的 以下划线作为前缀的 Vue文件 或 目录。
	
	