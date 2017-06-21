 # Node Learn

 ## Node's express & mongodb
**目标**：

使用express框架与mongodb实现简单的登录/注册前后台交互。

**技术支持**：

-   express框架
-   mongodb数据库

### login & register & express

**步骤**：

创建*Demo*目录

    $ mkdir Demo
    $ cd Demo

初始化目录，创建package.json文件

    $ npm init

安装express框架（本地安装，加入生成依赖）

    $ npm i express --save

安装body-Parser中间件（用来解析请求body中内容，做JSON编码处理，url编码处理，文件上传处理）

    $ npm body-Parser --save

创建*pages*目录，存放我的页面

    $ mkdir pages

进入*pages*目录，创建注册&登录页面（使用bootstrap快速完成页面）

进入[bootstrap官网 form](http://getbootstrap.com/css/#forms "表单代码")选择自己喜欢的样式代码copy过来。

进入[bootstrap官网 cdn](http://getbootstrap.com/getting-started/#download "css外链")