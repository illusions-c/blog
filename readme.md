# 一个系统

## 开发环境

nodejs: v6.0  && npm

mysql

redis

bower

gulp

## 表设计

```
users表
+-----------+--------------+------+-----+-------------------+----------------+
| Field     | Type         | Null | Key | Default           | Extra          |
+-----------+--------------+------+-----+-------------------+----------------+
| id        | int(11)      | NO   | PRI | NULL              | auto_increment |
| uid       | varchar(25)  | NO   |     | NULL              |                |
| email     | varchar(100) | NO   |     | NULL              |                |
| sign_date | timestamp    | NO   |     | CURRENT_TIMESTAMP |                |
| password  | varchar(200) | NO   |     | NULL              |                |
+-----------+--------------+------+-----+-------------------+----------------+
```

## 构建

`npm install`

`node app`

打开浏览器`localhost:4000`