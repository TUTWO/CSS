var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//默认界面
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/userLogin.html');
})

app.use(express.static('dist'));

app.post('/authenticate', urlencodedParser, function (req, res) {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        var user = data[req.body.name];
        if (user) {
            if (user.password == req.body.password) {
                res.send(user);
            }
        }
    })
})

app.get('/map', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
})


// app.get('/userInfo', function (req, res) {
//     res.sendFile(__dirname + '/userInfo.html');
// })


var server = app.listen(8088, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);

})