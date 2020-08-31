var express = require('express');
var app = express();
// var user = require('./routes/user');
app.locals.pretty = true; // html 코드를 보기 좋게 정렬

app.set('view engine' , 'pug');

app.use(express.static('public'));
// 미들웨어: req -> 미들웨어 -> 라우트 작업
// var myLogger = function(req, res, next){
//     console.log(req.url); // url: /user 등이 콘솔에 표시됨
//     next();
// }

// app.use(myLogger); // 미들웨어 사용, 이것이 실행된 후에 라우팅 된다?

app.get('/', function(req, res){
    // res.send('Hello World');
    res.render('home');
});

app.get('/login', function(req, res){
    // res.send('Hello World');
    res.render('login');
});

app.get('/logout', function(req, res){
    // res.send('Hello World');
    res.render('logout');
});

app.get('/', function(req, res){
    // res.send('Hello World');
    res.render('logout');
});

// app.use('/user', user);

// app.get('/user/:id', function(req, res) {
//     res.send('Received a GET request, param:' + req.params.id);
// });

// app.post('/user', function(req, res) {
//     res.json({ success: true })
// });

// app.put('/user', function(req, res) {
//     res.status(400).json({ message: 'Hey, you. Bad Request!' });
// });

// app.delete('/user', function(req, res) {
//     res.send('Received a DELETE request');
// });

app.listen(process.env.PORT||3000, function(){
    console.log('Example App is listening on port 3000');
})