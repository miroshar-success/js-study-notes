# File upload

# File upload

To handle file uploading, Nest provides a build-in module based on the multer middleware package for Express
Multer handles data posted in the **multipart/form-data**

```js
npm install -D @types/multer  // 类型包
```

```ts
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadedFile } from "@nestjs/common";
// usage
@Controller()
export class FileUploadController {
  @UseInterceptors(FileInterceptor("file")) // file 为post传递文件的字段
  // simply tie the **FileInterceptor() interceptor to the route handler and extract file from the request
  // using the @UploadedFile() decorator
  handleUploadFile(@UploadedFile() file: Express.Multer.File) {}
}
```

The **FileInterceptor()** decorator takes two arguments:

1. **fieldName** string that supplies the name of the field form the HTML form that holds a file
2. **options** options object of type **MulterOptions**, This is the same object used by the
   multer constructor.

## File validation

FileValidator is a regular class that has access to the file object and validates it according to the options
provided by the client.

Nest has two built-in **FileValiator** implementations you can use in your project.

1. MaxFileSizeValidator
2. FileTypeValidator

```ts
import {
  Controller, UseInterceptors, ParseFilePipe,
  UploadedFile, MaxFileSizeValidator, FileTypeValidator
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller ()
export class FileUploadController {
  @Post('/api/v1/upload/videod')
  @UseInterceptors(FileInterceptor('files')) // files为提交数据的字段
  handleUploadFile (@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000, message: '文件太大了' }),
        new FileTypeValidator({ fileType: 'image/png', message: '文件格式不正确' })
      ],
      errorHttpStatusCode: 400  // 验证失败时的状态码
    })
  ), file: Express.Multer.File) {

  }
}
```

## Array of files

To upload an array of files(identified with a single field name).(一个相同的字段, 传递多个文件)

**FilesInterceptor()** 装饰器接受 3 个参数

1. fieldName: 文件参数
2. maxCount: 一个可选的数值 表示可接收的最大文件数量
3. options: optional **MulterOptions** object.

```ts
// file-upload.controller.ts
import { UseInterceptors, UploadedFiles } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("upload")
export class UploadFileController {
  @Post("videos")
  @UseInterceptors(FilesInterceptor("files"))
  handleUploadVideos(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files); // 上传的文件数组
  }
}
```

## Multiple files

To upload multiple files(all with different field name keys) -- (不同的表示文件的字段)。use the **FileFieldInterceptor()**
decorator. 接收 2 个参数

1. uploadedFiles: an array of objects, where each object specifies a required **name** property with a string value
   specifying a field name. and an optional **maxCount** property.
2. optional **MulterOptions** object.

```ts
// upload-file.controller.ts
import { UseInterceptor, UploadedFiles } from '@nestjs/common'
import { FileFieldsInterceptor } from 'platform-express'
@Controller()
export class FileUploadController {
  @Post('file_upload')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1},
    { name: 'background', maxCount: 1}
  ]))
  handleUploadMultipleVideos (@UploadedFiles(): files: {
    avatar?: Express.Multer.File[],
    background?: Express.Multer.File[]
   }) {
    console.log(files)
    /**
     * {
     *    avatar: [],
     *    background: []
     * }
    */
  }
}
```

## No files

To accept **multipart/form-data** but not allow any files to be uploaded, use the **NoFilesInterceptor**.

(接收 form-data 格式的数据 数据中没有 file 文件, 处理之后的数据挂载在 request.body 上)

```ts
// file-upload.controller.ts
import { Req, Body } from "@nestjs/common";
import { NoFilesInterceptor } from "platform-express";
import { Request } from "express";

@Controller()
export class FormDataController {
  @Post("submit")
  @UseInterceptors(NoFilesInterceptor())
  handleProcessFormData(@Req() req: Request) {
    console.log("req", req.body);
    return {
      message: "信息提交成功",
    };
  }
  // 或者通过 Body() 装饰器提取数据
  handleProcessFormData(@Body() body) {
    console.log("body:", body);
    return {
      message: "信息提交成功",
    };
  }
}
```
