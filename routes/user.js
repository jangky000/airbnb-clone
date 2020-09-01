var express = require('express');
var router = express.Router();

// 회원 등록 폼
router.get('/register', function(req, res){
    res.send('register World');
    // res.render('register');
});

// 회원 등록 처리
router.post('/users', function(req, res){
    // res.send('Hello World');
    console.log(JSON.stringify(req.body, null, 2));

    res.render('users');
});

// 로그인
router.post('/login', function(req, res){
    res.send('Hello World');
    // res.render('login');
});

// 로그아웃
router.get('/logout', function(req, res){
    res.send('logout World');
    // res.render('logout');
});

module.exports = router;