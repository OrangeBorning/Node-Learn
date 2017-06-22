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