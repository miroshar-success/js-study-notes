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
