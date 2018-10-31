## 一、让你的命令行高亮起来
    https://github.com/TylerBrock/mongo-hacker

## 二、数据库了解
    http://www.runoob.com/mongodb/mongodb-databases-documents-collections.html

    https://mlab.com/home 线上数据库

## 三、数据模板 pug
    https://github.com/pugjs/pug
    https://pugjs.org/language/includes.html
    `$ npm install pug --save`

## 四、MongoDB安装
    1.brew install mongodb                  安装MongoDB
    2.brew info mongodb                     查看 mongodbq启动命令
    3.brew services start mongodb           启动MongoDB
    4.mongodb                               进入MongoDB数据库
        1).show dbs                         显示现有的数据库
        2).use nodejs-bolg                  创建一个数据库
        3).db.createCollection('articles')  往数据库添加表
        4).show collections                 显示添加的表
        5).db.articles.insert({ title: "Article One", author: "rails365", body: "This is article one" });   往表里多添加几条数据
        6).db.articles.find()               查找出articles表里的数据
        7).db.User.drop()                   删除数据库中的表

## 五、mongoose安装使用

## 六、使用bower安装管理 bootstrap jQuery

    http://html2jade.org/  html转为jade

## 七、使用信息组件 显示创建更新文章成功
    https://github.com/expressjs/session
    https://github.com/expressjs/express-messages
    https://github.com/jaredhanson/connect-flash

    表单验证start
    https://github.com/express-validator/express-validator
    https://express-validator.github.io/docs/custom-error-messages.html
    表单验证end

## 八、用户登录注册
    就是和创建文章一样  把db内新建一个数据表

## 九、密码加密
    https://github.com/kelektiv/node.bcrypt.js/
## 十、认证登录
    https://github.com/jaredhanson/passport
    http://www.passportjs.org/docs/configure/

## 十一、常看当前本地数据库
    1.`mongo`启动数据库
    2.`show dbs`查看当前所有的数据库
    3.`use nodejs-bolg`使用当前的数据库
    4.`db.users.find()` 查看当前数据库下表为`users`的内容
