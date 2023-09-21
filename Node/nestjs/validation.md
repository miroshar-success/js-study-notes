# Validation

To automatically validate incoming requests, Nest provides serval pipes available right out-of-the-box:

1. ValidationPipe
2. ParseIntPipe
3. ParseBoolPipe
4. ParseArrayPipe
5. ParseUUIDPipe

## Auto-validation

```ts
// main.ts
// (We will binding ValidationPipe at the application level) 确保所有请求参数以正确格式传递
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
}
```

## Disable detailed errors

Error messages can be helpful to explain what was incorrect in a request. However, some production environments prefer to disable detailed errors. (正式环境可能不需要错误信息)

```ts
app.useGlobalPipes(
  new ValidationPipe({
    disableErrorMessage: true,
  })
);
```

## Stripping properties

Out **ValidationPipe** can also filter out properties that should not be received by the method handler.

For example, if our handlers expects **email** and **password** properties, but a request also includes an **age**
property, this property can be automatically removed from the resulting DTO.

<!-- 如果你的参数只需要一个 emial 和 password属性, 但是传递过来的时候多了一个age属性, 最后接受的参数会参数age属性(设置whitelist:true) -->

```ts
app.useGlobalPipes({
  new ValidationPipe({
    whitelist: true
  })
})
```

## Transform payload objects

Payloads coming in over the network are plain JavaScript objects. The **ValidationPipe** can automatically transform
payloads to be objects typed according to their DTO classes.

<!-- 设置transform:true, 接受的参数将根据 校验的参数类型自动转换 -->

```js
// 全局
app.useGlobalPipes({
  transform: true,
});

// player.controller.ts (// 暂未测试出对象怎么转换的)
@Post()
@UsePipes(new ValidationPipe({ transform: true }))
async create(@Body() createCatDto: CreateCatDto) {
  console.log(createCatDto)
}

// 原始类型转换
@Get(':id')
findOne(@Param('id') id: number) {
  console.log(id, typeof id)  //123 'number'
}
```

## Explicit conversion

Alternatively (with auto-transformation disabled), you can explicitly cast values using the **ParseIntPipe** or
**ParseBoolPipe**

<!-- 显示转换 -->

```ts
@Get(':id')
findOne(
  @Param('id', ParseIntPipe) id: number,
  @Query('sort', ParseBoolPipe) sort: boolean
) {
  console.log(typeof id === 'number')     // true
  console.log(typeof sort === 'boolean')  // true
}
```
