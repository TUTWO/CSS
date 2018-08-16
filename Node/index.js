var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var axios = require('axios');

var token;

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use((req, res, next) => {
    if (req.path === '/authenticate') {
        if (req.headers.token) {
            console.log('test: ' + req.originalUrl);
            return next();
        }
    } else {
        console.log('test: ' + req.originalUrl);
        return next();
    }
});


// 默认界面
app.get('/', function (req, res) {
    // console.log(req.headers.token);
    res.sendFile(__dirname + '/userLogin.html');
})

app.post('/getToken', bodyParser.json(), function (req, res) {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        var user = data[req.body.name];
        if (user) {
            if (user.password == req.body.password) {
                var payload = {
                    'name': user
                }
                const secret = 'jwt';
                token = jwt.sign(payload, secret, { expiresIn: '1day' });
                res.send(token);
            } else {
                return res.status(401).send('invaild password');
            }
        } else {
            return res.status(401).send('invaild password');
        };
    })
})
app.use(express.static('dist'));

app.post('/authenticate', bodyParser.json(), function (req, res) {
    // res.send('OK');
    res.location(__dirname + '/dist/index.html');
    res.send('OK');
    // res.redirect(__dirname + '/dist/index.html');
})

app.get('/map', urlencodedParser, function (req, res) {
    // if (req.query.user) {
    return res.sendFile(__dirname + '/dist/index.html');
    // }
    // else {
    //     return res.status(401).send('invaild password');
    // }
})

app.get('/node_modules/jquery/dist/jquery.min.js', function (req, res) {
    res.send(__dirname + '/node_modules/jquery/dist/jquery.min.js');
})


app.post('/saveToJson', urlencodedParser, function (req, res) {
    // fs.writeFile('features.json',req.body.user ,'utf8', function () {
    //     res.send('Saved');
    // });
    let users = [];
    fs.readFile(__dirname + '/' + 'features.json', 'utf8', function (err, data) {
        if (data) {
            data = JSON.parse(data);
            if (data.user) {
                users.push(data);
            } else {
                users = data;
            }
            userFeatures = JSON.parse(req.body.user);
            for (let i of users) {
                if (i.user === userFeatures.user) {
                    infoIndex = users.indexOf(i);
                    break;
                } else {
                    infoIndex = -1;
                }
            }
            if (infoIndex > -1) {
                users[infoIndex].infos = users[infoIndex].infos.concat(userFeatures.infos);
            } else {
                users.push(userFeatures);
            }
            fs.writeFile('features.json', JSON.stringify(users), 'utf8', function () {
                res.send('Saved');
            });
        } else {
            fs.writeFile('features.json', req.body.user, 'utf8', function () {
                res.send('Saved');
            });
        }
    })
})

app.post('/readFromJson', urlencodedParser, function (req, res) {
    fs.readFile(__dirname + '/' + 'features.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].user === req.body.user) {
                res.send(data[i]);
            }
        }
    })
})

// app.get('/userInfo', function (req, res) {
//     res.sendFile(__dirname + '/userInfo.html');
// })


var server = app.listen(8088, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);

})