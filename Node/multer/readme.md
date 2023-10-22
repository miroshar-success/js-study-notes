# Multer

Multer is a node.js middleware for handling **multipart/form-data**, which is primarily used for uploading files.

```js
// 用法
const multer = require("multer");
const express = require("express");

const upload = multer({ dest: "uploads/" }); // 指定上传的目录

const app = express();

// 单个文件上传
app.post("/api/upload", upload.single("file"), function (req, res) {
  // req.file     //上传的文件
  // req.body     // 文件之外的其他数据
});

// 多个文件上传
app.post("/api/upload", upload.array("photos", 12), function (req, res) {
  // req.files  // 上传的多个文件
  // req.body   // 文件之外的其他数据 (req.body will contain the text fields, if there were any)
});

// 如果只想接收文件之外的 form-data数据, 使用 .none() 方法
app.post("/api/create_user", upload.none(), function (req, res) {});
```

## options

Multer accepts an options object, the most basic of which is the **dest** property.
In case you omit the options object, the files will be kept in memory and never written to disk.

```js
const multer = require("multer");
const upload = multer({
  dest: "/upload", // where to store the files
  fileFilter: function (req, file, cb) {
    cb(null, false); // reject file
    cb(null, true); // accept file
    // function to control which files are accepted
  },
  limits: {
    // An object specifying the size limits of the following optional properties
    fieldNameSize: 100, // max field name size
    fieldSize: 1024, // max field value size
    fileSize: Infinity, // the max file size (in bytes)
    // ...
    // Specifying the limits can help protect your site against denial of service attacks.
  },
});
```

## storage

The disk storage engine gives you full control on storing files to disk

```js
const storage = multer.diskStorage({
  // 文件存储在什么地方 (destination is used to determine within which folder the uploaded files should be stored)
  // 可以传递一个字符串 或者一个函数 (如果传递的是一个函数, 需要先创建好目录)
  destination: function (req, file, cb) {
    cb(null, "/videos");
  },
  // filename is used to determine what the file should be named inside the folder. If no filename
  // is given, each file will be given a random name that doesn't include any file extension.
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
```

## Method

1. #single(fieldname)
   接受单个文件, 文件挂载在 req.file

2. #array(fieldname [, maxCount])
   接受多个文件, 一个可选的可接收最大数量的文件

3. #.fields(fields)
   接受文件字段指定的组合 Accept a mix of files, specified by **fields**.

```js
[
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 8 },
];
```

Multer will not append any file extension for you, your function should return a filename complete
with an file extension.
