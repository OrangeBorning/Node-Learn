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

    $ npm body-parser --save

创建*pages*目录，存放我的页面

    $ mkdir pages

进入*pages*目录，创建注册&登录页面（使用bootstrap快速完成静态页面）

进入[bootstrap官网 form](http://getbootstrap.com/css/#forms "表单代码")选择自己喜欢的样式代码copy过来。

进入[bootstrap官网 CDN](http://getbootstrap.com/getting-started/#download "css外链")把css外链copy过来。

进入[jquery官网 CDN](https://code.jquery.com/ "jquery")把jquery引入。

在regitster页面html中插入js：

    $(function () {
        var user = $("#username"),
            pwd = $("#pwd");
        $(".btn").on('click',function(event) {
            event.preventDefault();
            var req = {
                username:user.val(),
                pwd:pwd.val()
            };
            $.post("/register",req,function (data) {
                    console.log(data);
            });
         });
    });

在login页面html中插入js：

    $(function () {
        var user = $("#username"),
            pwd = $("#pwd");
        $(".btn").on('click',function(event) {
            event.preventDefault();
            var req = {
                username:user.val(),
                pwd:pwd.val()
            };
            $.post("/login",req,function (data) {
                    console.log(data);
            });
         });
    });

这两段代码是页面在服务器中发送请求，以便服务器做出响应。

创建app.js后台程序，处理请求，做出响应。

    var express = require("express");//调用express
    var bodyParser = require("body-parser");//调用body-parser,用来处理post请求
    var app = express();
    app.use(bodyParser.json());//将请求体内容解析做json编码处理
    app.use(bodyParser.urlencoded({//将请求体内容解析做url编码处理。
        extended : true
    }));
    //对于静态文件，express框架，内置了中间件static指定静态资源的位置。
    app.use(express.static("pages"));
    app.use(express.static("static"));
    app.post('/register',function(req,res){
        var user = req.body;
        res.send("注册页面请求成功接收")
    });
    app.post('/login',function(req,res){
        var user = req.body;
        res.send("登录页面请求成功接收")
    });
    app.listen(8090,function(){//设置监听端口
        console.log("服务器连接成功！");
    });

完成register.html & login.html & app.js以后，运行app.js.

    $ node app.js

成功运行后命令行打印：

    服务器连接成功！

进入注册页面测试：

    localhost:8090/register.html

在register页面输入信息，点击注册，发出post请求，打开devTools(F12),console中可以看见以下内容，说明服务器环境下请求响应成功：

    注册页面请求成功接收

同样的在login页面测试：

    localhost:8090/login.html

后台打印出：

    登录页面请求成功接收

**NOTE**:express内置了中间件static可以指定静态资源的存放位置，所以在静态页面书写中，引用的css资源我们不用相对位置：

    <link rel="stylesheet" href="common.css">

其他静态资源的位置也是如此。到这里，我们成功的完成了在express框架下的服务器环境处理请求，并作出响应。

### mongoose & express

以上完成了注册登录页面链接服务器，服务器对请求作出响应的步骤，接下来我们要完成的是。数据库与服务器的连接。

#### Dedicated DevTools for Node.js

安装最新版本的[Chrome开发者版本](https://api.shuax.com/tools/getchrome 'Chrome离线安装包')，新增了一个Node.js开发者工具，方便调试debug


