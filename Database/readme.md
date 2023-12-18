# MySql

## 概念

1. 数据库是一些关联表的集合
2. 列: 一列包含了相同类型的数据
3. 行: 一行是一组相关的数据
4. 主键: 主键是唯一的。一个数据表中只能包含一个主键
5. 外键: 外键用于关联两个表
6. 索引: 使用索引可以快速访问数据库表中的特定信息。索引是对数据库表中一列或多列的值进行排序的一种结构。

## 安装

配置环境变量:

```js
// 以下为mac配置环境变量

// vim ~/.zshrc
export PATH="/usr/local/mysql/bin:$PATH"

// 刷新环境变量
source ~/.zshrc
```

## 连接数据库及操作

注意输入的命令需要加 ; .

```js
// 1. 连接数据库
mysql -u root -p

/**
 * -u 用于指定用户名
 * -p 需要输入密码
*/

// 查看数据库
SHOW DATABASES; // show databases

// 要使用的数据库
USE database_name;

// 创建数据库
create database database_name;

// 删除数据库
drop database databas_name;


// 创建用户表
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY, // id 自增 为主键
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  birthdate DATE,
  is_active BOOLEAN DEFAULT TRUE
);

// 显示数据表
show tables;

// 查看当前表详细信息
desc users;

// 删除数据表
drop table table_name;

// 查询数据
SELECT column1, column2 ... FROM table_name
SELECT * from table_name
/**
 *
 *column1, column2 表示列的字段名。 使用* 表示选择所有列。 table_name表示表名。
*/

SELECT * FROM users WHERE is_active = TRUE;
// WHERE 是指定条件过滤

SELECT * FROM users ORDER BY birthdate DESC
// ORDER BY 指定结果集的排序  ASC(升序), DESC (降序)

SELECT * FROM users LIMIT 10; // limit限制返回的行数
```
