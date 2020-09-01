const express = require('express');
const app = express();
// const path = require('path'); // path.join(__dirname, '../public/index.html') 등으로 상대경로를 쓰기 위해 사용하는 모듈

const userRoute = require('./routes/user') // 라우팅 모듈



// 테스트 데이터
// let doc1 = {
//     id: 'user1',
//     pwd: '1234'
// };

// let doc2 = {
//     id: 'user2',
//     pwd: '1234'
// };


// var user = require('./routes/user');
app.locals.pretty = true; // html 코드를 보기 좋게 정렬

app.set('view engine' , 'pug');

app.use(express.static('public')); // 정적 파일 디렉토리 설정
// == app.use('/', express.static('public')); 
app.use('/user', userRoute); // /user로 요청이 들어오면 user.js에서 라우팅 처리함
// 미들웨어: http요청 -> 미들웨어 -> 라우트 작업
// var myLogger = function(req, res, next){
//     console.log(req.url); // url: /user 등이 콘솔에 표시됨
//     next();
// }

// app.use(myLogger); // 미들웨어 사용, 이것이 실행된 후에 라우팅 된다?

app.get('/', function(req, res){
    // res.send('Hello World');
    res.render('home');
});

// // 회원 등록 폼
// app.get('/register', function(req, res){
//     // res.send('Hello World');
//     res.render('register');
// });

// // 회원 등록 처리
// app.post('/users', function(req, res){
//     // res.send('Hello World');
//     console.log(JSON.stringify(req.body, null, 2));

//     res.render('users');
// });

// // 로그인
// app.post('/login', function(req, res){
//     // res.send('Hello World');
//     res.render('login');
// });

// // 로그아웃
// app.get('/logout', function(req, res){
//     // res.send('Hello World');
//     res.render('logout');
// });



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