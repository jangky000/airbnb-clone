const express = require('express');
const morgan = require('morgan'); // 로깅 미들웨어
const bodyParser = require('body-parser'); // json 형식으로 파싱하기 위해 사용
const cookieParser = require('cookie-parser');

const configs = require('./env/config');

// 데이터 모델
const sessionManager = require('./models/session');

// 라우팅 모듈
const userRoute = require('./routes/user') 
const searchRoute = require('./routes/search');

const app = express();

app.locals.pretty = true; // html 코드를 보기 좋게 정렬
app.set('view engine' , 'pug');
app.use(express.static('public')); // 정적 파일 디렉토리 설정

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); // 클라이언트 서버 간에 url에서 아스키코드 외의 문자형이 인코딩 됨
app.use(cookieParser());

// 미들웨어: http요청 -> 미들웨어 -> 라우트 작업
var globalSession = function(req, res, next){
    res.locals.sessObj = {name: undefined, email: undefined};
    if(req.cookies['sid']){
        const sid = req.cookies['sid'];
        // 세션 검사
        const session = sessionManager.readBySID(sid); 
        console.log("현재 세션 정보");
        console.log(session);
        // 세션이 삭제 된 경우 쿠키에서 sid도 삭제
        if(JSON.stringify(session) === JSON.stringify({})){
            res.clearCookie("sid"); // 쿠키 삭제
        }else{
            sessionManager.updateSession(sid, configs.cookieExpireSec*1000);
            // 쿠키 유효시간 업데이트
            res.cookie('sid', sid, {maxAge:configs.cookieExpireSec*1000}); // MaxAge초
            res.locals.sessObj = {name: session.name, email: session.email};
        }
    }
    next();
}
app.use(globalSession); // 미들웨어 사용, 이것이 실행된 후에 라우팅 된다

app.get('/', function(req, res){
    res.render('home');
});

app.use('/user', userRoute); // /user로 요청이 들어오면 user.js에서 라우팅 처리함
app.use('/search', searchRoute);

// 에러 핸들러
// 등록되지 않은 path로 요청이 오는 경우
// http-errors 모듈로 error 객체 생성 후 에러 처리 핸들러로 넘김
app.use((req, res, next) => { // 404 처리 부분
    res.status(404).send('404 not found 에러');
});

app.use((err, req, res, next) => { // 에러 처리 부분
    console.error(err.stack); // 에러 메시지 표시
    res.status(500).send('500 서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
});

app.listen(process.env.PORT||3000, function(){
    console.log('Example App is listening on port 3000');
})