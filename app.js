const express = require('express');
const app = express();
// const path = require('path'); // path.join(__dirname, '../public/index.html') 등으로 상대경로를 쓰기 위해 사용하는 모듈

const morgan = require('morgan'); // 로깅 미들웨어
const bodyParser = require('body-parser'); // json 형식으로 파싱하기 위해 사용
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user') // 라우팅 모듈
const sessionManager = require('./models/session');
const configs = require('./env/config');
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

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); // 클라이언트 서버 간에 url에서 아스키코드 외의 문자형이 인코딩 됨
app.use(cookieParser());

// 미들웨어: http요청 -> 미들웨어 -> 라우트 작업
var globalSession = function(req, res, next){
    // console.log(req.url); // url: /user 등이 콘솔에 표시됨
    res.locals.sessObj = {name: undefined, email: undefined};
    if(req.cookies['sid']){
        const sid = req.cookies['sid']
        // 세션 검사
        session = sessionManager.readBySID(sid);
        sessionManager.updateSession(sid, configs.cookieExpireSec*1000);
        // 쿠키 유효시간 업데이트
        res.cookie('sid', sid, {maxAge:configs.cookieExpireSec*1000}); // MaxAge초
        res.locals.sessObj = {name: session.name, email: session.email};
    }
    next();
}
app.use(globalSession); // 미들웨어 사용, 이것이 실행된 후에 라우팅 된다

app.get('/', function(req, res){
    res.render('home');
    // res.send('Hello World');
});

app.use('/user', userRoute); // /user로 요청이 들어오면 user.js에서 라우팅 처리함

// app.get('/state', function(req,res) {
//     res.send('cookie : ' + req.cookies.key);
// });

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

// 에러 핸들러
// 404 에러처리
// 500 에러처리

app.listen(process.env.PORT||3000, function(){
    console.log('Example App is listening on port 3000');
})