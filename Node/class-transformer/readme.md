# class-transformer

class-transfomer allows you to transform plain object to some instance of class and versa.
It allows to serialize/deserialize object based on criteria.

Purpose of this library is to help you to map your plain javascript objects to the instances of classes you have.

In JavaScript there are two types of objects:

1. plain (literal) objects
2. class (constructor) objects

## Install

```js
// Node.js
npm install class-transformer --save
npm install reflect-metadata --save
```

## plainToInstance

This method transforms a plain javascript object to instance of specific class.

```ts
const users = [
  {
    id: 1,
    firstName: "Johny",
    lastName: "Cage",
    age: 27,
  },
  {
    id: 2,
    firstName: "Ismoil",
    lastName: "Somoni",
    age: 50,
  },
  {
    id: 3,
    firstName: "Luke",
    lastName: "Dacascos",
    age: 12,
  },
];

class User {
  constructor(id, firstName, lastName, age) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  getName() {
    return this.firstName + " " + this.lastName;
  }
  isAdult() {
    return this.age > 36 && this.age < 60;
  }
}

const realUsers = plainToInstance(User, users);

for (const user of realUsers) {
  console.log(user.getName, user); // 每个user上面都有getName() 方法,
  // user 变成了 User的实例对象
}
```

## classToPlain （instanceToPlain）

This method transforms your class object back to plain javascript object.

```js
class Player {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
const player = new Player("kyrie", "irving");
console.log(instanceToPlain(player), instanceToPlain(player) instanceof Player);
// { firstName: 'kyrie', lastName: 'irving' } false
```

## classToClass

This method transforms your class object into a new instance of the class object. This may betreated as deep clone clone of your objects.

```js
const { instanceToInstance } = require("class-transformer");
const copy_singer = instanceToInstance(singer);
// 深拷贝
```

## Enforcing type-safe instance

The default behavior of the **plainToInstance** method is to set all properties from the plain object, even those which
are not specified in the class.

```ts
import { Expose, plainToClass } from "class-transformer";

class User {
  @Expose() id: number;
  @Expose() firstName: string;
  @Expose() lastName: string;
}

const fromPlainUser = {
  unkownProp: "hello there",
  firstName: "Umed",
  lastName: "Khudoiberdiev",
};

console.log(
  plainToClass(User, fromPlainUser, { excludeExtraneousValues: true })
);

// User {
//   id: undefined,
//   firstName: 'Umed',
//   lastName: 'Khudoiberdiev'
// }
```

## Exposing properties with different names

If you want to expose some of the properties with a different name, you can do that by specifying a **name** option
to **@Expost** decorator

```js
import { Expose } from "class-transformer";
export class User {
  @Expose({ name: "uuid" })
  id: number;

  firstName: string;
  lastName: string;

  @Expose({ name: "secretKey" })
  password: string;
}
```

## Skipping specific properties

Sometimes you want to skip some properties during transformation. This can be done using **@Exclude** decorator:

```js
class User {
  id: number;
  name: string;
  @Exclude()
  password: string;
  constructor(id, name, password) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
}
const user = {
  id: 1,
  name: "hello",
  password: "12345",
};
const transform_user = plainToInstance(User, user);
console.log(transform_user); // { id: 1, name: 'hello', password: undefined }
```

## Transform

You can perform additional data transformation using the **Transform()** decorator.

```js
{
  // ...
  @Transform(({ value }) => value.name)
  role: RoleEntity
}

// -------- demo -------
// 角色
class RoleEntity {
  name: string;
  id: number;
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}

export class UserController {
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/user_info')
  findOne(): UserEntity {
    return new UserEntity({
      id: 1,
      firstName: 'kyrie',
      lastName: 'irving',
      password: '12345',
      role: new RoleEntity('管理员', 1),
    });
  }
}
// {"id":1,"firstName":"kyrie","lastName":"irving","role":"管理员","fullName":"kyrie irving"}
```
