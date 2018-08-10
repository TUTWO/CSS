var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

// var passport = require('passport');
// var passportJWT = require('passport-jwt');

// var ExtractJwt = passportJWT.ExtractJwt;
// var JwtStrategy = passportJWT.Strategy;

const secret = 'jwt';
var token;

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
                var payload = {
                    'name': user
                }
                token = jwt.sign(payload, secret, { expiresIn: '1day' })
                res.send({ 'user': user, 'secret': 'jwt' });
            }
        } else {
            return res.status(401).send('invaild password');
        }
    })
})

app.post('/map', urlencodedParser, function (req, res) {
    // jwt.verify(token, secret, (err, decoded) => {
    //     if (err) {
    //         res.send(err);
    //     }
    //     res.send(decoded);
    // })
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