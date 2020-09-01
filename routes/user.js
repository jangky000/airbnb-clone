const express = require('express');
const router = express.Router();
const morgan = require('morgan'); // 로깅 미들웨어
const bodyParser = require('body-parser'); // json 형식으로 파싱하기 위해 사용
const Bcrypt = require('../models/encrpyt'); // 암호화
const UserDAO = require('../models/user.js');

const bcrypt = new Bcrypt();
const userDAO = new UserDAO();

router.use(morgan('dev'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true})); // 클라이언트 서버 간에 url에서 아스키코드 외의 문자형이 인코딩 됨


// 회원 등록 폼
router.get('/register', function(req, res){
    // res.send('register World');
    res.render('register');
});

// 회원 등록 처리
router.post('/register', function(req, res){
    console.log(JSON.stringify(req.body, null, 2));
    // 이메일 중복체크
    // 값 존재하는지 체크
    let json = req.body;
    json['pwd'] = bcrypt.generateHash(json.pwd);
    delete json['pwdCheck'];
    userDAO.create(json);
    // console.log(req.body);
    // res.send(req.body);
    res.render('login');
});

// 로그인 폼
router.get('/login', function(req, res){
    // res.send('Hello World');
    res.render('login');
});

// 로그인 처리
router.post('/login', function(req, res){
    console.log(JSON.stringify(req.body, null, 2));
    // const id = req.body.id;
    // const pwd = bcrypt.generateHash(req.body.pwd);
    const promise = userDAO.readByEmail(req.body.email);
    promise.then(json_arr=>{
        console.log(json_arr[0]['pwd']); //object
        if(json_arr.length === 1){
            const pwd_check = bcrypt.validateHash(req.body.pwd, json_arr[0]['pwd']);
            if(pwd_check){
                // console.log('패스워드 일치');
                res.send(`<h1>패스워드 일치</h1>`);
                // res.render('home'); // 로그인 성공
                // 세션 등록
            } else{
                // console.log('패스워드 불일치');
                res.send(`<h1>패스워드 불일치</h1>`);
                // res.render('login');
            }
        } else if(json_arr.length === 0){
            // 존재하지 않는 id
            // console.log('존재하지 않는 id 입니다.');
            res.send(`<h1>존재하지 않는 id 입니다.</h1>`);
            // res.render('login');
        } else{
            // console.log('id가 유일하지 않습니다. 저장소 문제');
            res.send('<h1>id가 유일하지 않습니다. 저장소 문제</h1>');
            // res.render('login');
        }

    });
    // const result = bcrypt.validateHash('asd', pwd);
    // res.send(`<h1>login world!</h1>`);
});

// 로그아웃
router.get('/logout', function(req, res){
    res.send('logout World');
    // res.render('logout');
});

module.exports = router;