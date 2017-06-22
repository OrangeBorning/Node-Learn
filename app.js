	var express = require("express");//调用express

    var bodyParser = require("body-parser");//调用body-parser,用来处理post请求

    var app = express();

    var mongoose = require("mongoose");//调用mongoose

    mongoose.connect("mongodb://localhost/learnnode")//加粗部分为数据库名，是你自己创建的用来存储用户数据的数据库名。

    var db = mongoose.connection;

    db.on("error",console.error.bind(console,"数据库连接失败"));

    db.once("open",function(){
        console.log("数据库连接成功");
    });

    var User = require('./model/Usermodel');


    app.use(bodyParser.json());//将请求体内容解析做json编码处理
    app.use(bodyParser.urlencoded({//将请求体内容解析做url编码处理。
        extended : true
    }));

    //对于静态文件，express框架，内置了中间件static指定静态资源的位置。
    app.use(express.static("pages"));
    app.use(express.static("static"));

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
            // res.redirect("/login"); //重定向
            res.json({code:0,msg:"保存成功"}); //给前端相应一个json对象回去
        })
    });

    app.post('/login',function(req,res){

        var user = req.body;

        User.find({"username":user.username},function(err,doc){
            if (err) {
                res.json({code:1,msg:"登陆失败"});
            };


            if (doc.length == 1) {
                res.json({code:0,msg:"登陆成功"});
            }else{
                res.json({code:1,msg:"用户不存在"});
            };

        });
    });

    app.listen(8090,function(){//设置监听端口
        console.log("服务器连接成功！");
    });