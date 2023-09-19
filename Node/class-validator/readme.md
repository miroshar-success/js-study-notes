# class-validator

## Installation

```js
npm install class-validator --save
```

## Usage

```js
import {
  validate,
  Contains,
  IsInt,
  Length,
  IsDate,
  Min,
  Max,
} from "class-validator";

export class Post {
  @Length(10, 20)
  title: string;
  @Contains("hello")
  text: string;
  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;
  @IsDate()
  createDate: Date;
}
// 验证
validate(data).then((errors) => {
  // errors
  // [
  /*   ValidationError {
    target: CreateUserDto {},
    value: undefined,
    property: 'username',
    children: [],
    constraints: {
      isLength: 'username must be longer than or equal to 6 characters'
    }
  },
  ValidationError {
    target: CreateUserDto {},
    value: undefined,
    property: 'birth_date',
    children: [],
    constraints: { isDate: 'birth_date must be a Date instance' }
  },
  ValidationError {
    target: CreateUserDto {},
    value: undefined,
    property: 'age',
    children: [],
    constraints: {
      max: 'age must not be greater than 100',
      min: 'age must not be less than 10',
      isInt: 'age must be an integer number'
    }
  }
] */
});
```
