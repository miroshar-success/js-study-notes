# formidable

	可以解析post请求传递的数据或者文件
	
	安装:
		npm install formidable --save
	
	引入模块:
		const formidable = require("formidable");
	
	初始化:
		const form = new formidable.IncomingForm();

	设置上传文件的保存路径:
		form.uploadDir = "/my/dir";
		
	是否保存文件的后缀名:
		form.keepExtensions = false;
		
	限制上传文件的大小
		form.maxFieldSize = 20 * 1024 * 1024;
	
	接受多个文件
		form.multiples = true;  
		
	解析Post数据
		form.parse(req,callback(err,fields,files));
		
