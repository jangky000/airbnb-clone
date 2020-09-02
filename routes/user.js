const express = require('express');
const router = express.Router();

const Bcrypt = require('../models/encrpyt'); // 암호화
const UserDAO = require('../models/user');
const sessionManager = require('../models/session');


const bcrypt = new Bcrypt();
const userDAO = new UserDAO();



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
    // console.log(JSON.stringify(req.body, null, 2));
    // const id = req.body.id;
    // const pwd = bcrypt.generateHash(req.body.pwd);
    const promise = userDAO.readByEmail(req.body.email);
    promise.then(json_arr=>{
        // console.log(json_arr);
        if(json_arr.length === 1){
            const pwd_check = bcrypt.validateHash(req.body.pwd, json_arr[0]['pwd']);
            if(pwd_check){
                // res.send(`<h1>패스워드 일치</h1>`);
                // console.log(sessionManager.generateSID());
                const sid = sessionManager.generateSID();
                // 세션 등록
                sessionManager.saveSession(sid, json_arr[0].email, json_arr[0].name, 10*1000); // 10초
                // 쿠키 등록
                res.cookie('sid', sid, {maxAge:1000*10}); // 10초
                res.redirect('/'); // 로그인 성공
            } else{
                res.send(`<h1>패스워드 불일치</h1>`);
                // res.render('login');
            }
        } else if(json_arr.length === 0){
            res.send(`<h1>존재하지 않는 id 입니다.</h1>`);
            // <script>alert("");locatin.href="/";</script>
            // res.redirect();
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