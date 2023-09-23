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

## Mapped Types

When building input validation types, it is often useful to build create and update variations on the same type.
The **create** variant may require all fields, while the **update** variant may make all fields optional.

1. PartialType - returns a type (class) with all properties of the input type set to optional(设置所有属性为可选)
2. PickType - constructs a new type (class) by picking a set of properties from an input type (从某个类型中选择需要的属性)
3. OmitType - constructs a type by picking all properties from an input type and then removing a particular set of keys (从指定的类型中移除某些属性)
4. IntersectionType - combines two types into one new type (class) 组合两个类型

```ts
// 一个demo
// user.dto.ts
import { PartialType } from "@nestjs/swagger";
import {
  IsNumberString,
  MinLength,
  MaxLength,
  IntersectionType,
} from "class-validator";
// 创建参数
export class CreateUserDto {
  @MinLength(6)
  @MaxLength(20)
  username: string;
  @IsNumberString()
  age: number;
}

// 更新参数
export class UpdateUserDto extends PartialType(CreateUserDto) {}

// 提取某个参数
export class UpdateUserAgeDto extends PickType(CreateUserDto, ["age"]) {}

// 合并两个类的参数
class SchoolDto {
  @IsString()
  school_name: string;
}
export class UserCompletePropsDto extends IntersectionType(
  CreateUserDto,
  SchoolDto
) {}
```

以上这些工具函数也可以组合起来使用 (The type mapping utility functions are composable).

```ts
export class UpdateUsrDto extends PartialType(
  Omit(CreateUserDto, ['name'] as const)
)
// 移除name属性,并将其贴所有属性设置为可选
```
