# Stream files

There may be times where you would like to send back a file from your **REST API** to the client.

```ts
// stream.controller.ts
import { createReadStream } from "fs";
import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { join } from "path";

@Controller("stream")
export class StreamController {
  @Get("package")
  getFile(@Res() res: Response) {
    const file = createReadStream(join(process.cwd(), "package.json"));
    file.pipe(res);
  }
}

// 访问 /stream/package 接口的时候 会返回读取到的 package.json文件内容
```

## Streamable File class

```ts
import { Controller, Get, StreamableFile } from "@nestjs/common";
import { createReadStream } from "fs";
import { join } from "path";

@Controller()
export class StreamController {
  @Get()
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), "image"));
    return new StreamableFile(file);
  }
}
```

The default content type is **application/octet-stream**, if you need to customize the response you can use
the **res.set** method or the **@Header()** decorator.

```js
// 此demo 用于设置 下载的文件名
import { createReadStream } from "fs";
import { join } from "path";
import { Res } from "@nestjs/common";
import { Response } from "express";

export class FileController {
  @Get()
  getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), "jay.png"));
    res.set({
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="jay123444.png"',
      // 此处filename 设置中文名 会报错， filename的名称即为下载时的名称。
    });
  }
}
```
