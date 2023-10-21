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
  fileFilter: function () {
    // function to control which files are accepted
  },
});
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
