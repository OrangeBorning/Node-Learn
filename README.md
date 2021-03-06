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
                location.href="login.html"
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

### mongodb & express

以上完成了注册登录页面链接服务器，服务器对请求作出响应的步骤，接下来我们要完成的是。数据库与服务器的连接。

#### Dedicated DevTools for Node.js

安装最新版本的[Chrome开发者版本](https://api.shuax.com/tools/getchrome 'Chrome离线安装包')，新增了一个Node.js开发者工具，方便调试debug

获取请求体的内容：

    req.body:{username:"test",pwd:"123456"};

我们现在获取到了页面发来的请求体，传递了一个对象，在这个对象中有我们需要保存入数据库的数据。

#### mongodb

mongodb数据库安装配置：

安装完mongodb后，选择一个磁盘区来存储数据，例：

    D:\data

在d盘中新建了文件夹data，这个文件用来存储数据信息及数据库日志

    data
      |
      |_ _ conf
      |      |_ _mongo.conf
      |_ _ db
      |
      |_ _ dbconf
             |_ _ mongodb.log

在mongodb安装目录下找到bin目录，打开以后创建一个start.bat文件

    $ touch start.bat

写入以写内容：

    mongod -f D:\data\conf\mongo.conf

mongo.conf内容写入：

    dbpath = D:\data\db
    logpath = D:\data\dbConf\mongodb.log

#### connect to server by mongoose
安装mongoose，mongoose是用来连接mongodb与服务器的插件

    $ npm i mongoose --save

在app.js 中增加以下内容：

    var mongoose = require("mongoose")
    mongoose.connect("mongodb://localhost/**learnnode**")
     //加粗部分为数据库名，是你自己创建的用来存储用户数据的数据库名。
    var db = mongoose.connection;
    db.on("error",console.error.bind(console,"数据库连接失败"));
    db.once("open",function(){
        console.log("数据库连接成功");
    });

打开start.bat,开启数据库，打开mongo.exe在数据库中做操作，创建新的创建库，用来存储服务器数据

    use learnnode

在Demo目录下打开命令行，输入：

    node app.js

后台打印以下结果：

    服务器连接成功！
    数据库连接成功

到这里就顺利完成了，数据库与服务器的连接。

###  data save

#### mongoose & schema & model
创建schema目录，用来存储数据结构骨架文件。

    $ mkdir schema

创建userschema.js文件，存储注册表中的用户注册信息。

    var mongoose = require("mongoose");
    //一种以文件形式存储数据库模型骨架，建立一个映射（与数据库集合属性对于的映射）
    var UserSchema = mongoose.Schema({
        username : String,
        pwd : String
    });
    module.exports = UserSchema;

创建model目录，用来存储数据模型文件。

    $ mkdir model

创建usermodel.js文件，存储注册表中的用户注册信息。

    var mongoose = require("mongoose");
    var UserSchema = require("../schema/userschema");
    var Usermodel = mongoose.model("user",UserSchema)
    module.exports = Usermodel;

完成数据骨架模型建立后，在app.js中调用它

    var User = require('./model/Usermodel');

处理register页面发来的请求，将注册信息存储进数据库

    app.post('/register',function(req,res){
        var user = req.body;
        var u = new User({
            username:user.username,
            pwd:user.pwd
        });
        u.save(function(err,doc){ //使用实例 u 的save方法 来执行数据的保存
            if (err) {
                res.json({code:1,msg:"保存失败！"});
                return
            };
           res.json({code:0,msg:"保存成功"}); //给前端相应一个json对象回去
        })
    });

处理post页面发来的请求，查询数据库中用户信息。

