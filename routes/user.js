const express = require('express');
const router = express.Router();

const Bcrypt = require('../models/encrpyt'); // 암호화
const UserDAO = require('../models/user');
const sessionManager = require('../models/session');
const configs = require('../env/config');

const bcrypt = new Bcrypt();
const userDAO = new UserDAO();

// url 접근 관리
router.use('/', function(req, res, next){
    // console.log(req.url);
    // console.log(req.cookies['sid']);
    const withAuth = ['/mypage', '/logout']; // 인증 후 접근 가능
    const withoutAuth = ['/register', '/login']; // 인증 후 접근 불가능

    if(req.cookies['sid']){
        if(withoutAuth.includes(req.url)) return res.redirect("/"); // return 꼭 필요
    } else{
        if(withAuth.includes(req.url)) return res.redirect("/");
    }
    next();
});

// 회원 등록 폼
router.get('/register', function(req, res){
    // res.send('register World');
    res.render('user/register');
});

// 회원 등록 처리
router.post('/register', async function(req, res){
    const emailCnt = await userDAO.countEmail(req.body.email);
    // return res.send("일치 개수" + cnt);
    if(emailCnt !== 0) return res.send("<script>alert('이미 존재하는 이메일입니다.'); history.back();</script>");
    if(req.body.pwd !== req.body.pwdCheck) return res.send("<script>alert('패스워드 확인이 필요합니다.'); history.back();</script>");
    // console.log(JSON.stringify(req.body, null, 2));
    // 이메일 중복체크
    // 값 존재하는지 체크
    let json = req.body;
    json['pwd'] = bcrypt.generateHash(json.pwd);
    delete json['pwdCheck'];
    userDAO.create(json);
    // console.log(req.body);
    // res.send(req.body);
    // 회원가입이 완료되었습니다. 표시하기
    res.send("<script>alert('회원가입이 완료되었습니다'); location.href='./login'</script>");
    // res.redirect('./login');
});

// 로그인 폼
router.get('/login', function(req, res){
    // res.send('Hello World');
    res.render('user/login');
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
                sessionManager.saveSession(sid, json_arr[0].email, json_arr[0].name, configs.cookieExpireSec*1000); // MaxAge초
                // 쿠키 등록
                res.cookie('sid', sid, {maxAge:configs.cookieExpireSec*1000}); // MaxAge초
                res.send("<script>alert('로그인 성공'); location.href='/'</script>");
                // res.redirect('/'); // 로그인 성공
            } else{
                // res.send(`<h1>패스워드 불일치</h1>`);
                res.send("<script>alert('패스워드 불일치'); history.back();</script>");
                // res.redirect('./login');
            }
        } else if(json_arr.length === 0){
            // res.send(`<h1>존재하지 않는 id 입니다.</h1>`);
            res.send("<script>alert('존재하지 않는 id 입니다.'); history.back();</script>");
            // res.redirect('./login');
        } else{
            // res.send('<h1>id가 유일하지 않습니다. 저장소 문제</h1>');
            res.send("<script>alert('id가 유일하지 않습니다. 저장소 문제'); location.href='/'</script>");
            // res.render('login');
        }

    });
    // const result = bcrypt.validateHash('asd', pwd);
    // res.send(`<h1>login world!</h1>`);
});

// 로그아웃
router.get('/logout', function(req, res){
    // 쿠키 삭제
    res.clearCookie('sid');
    // 세션 삭제
    sessionManager.deleteSession(req.cookies['sid']);
    // res.send('logout World');
    res.send("<script>alert('로그아웃 되었습니다.'); location.href='/';</script>");
    // res.redirect('/'); // 로그아웃
});

// 내 정보
router.get('/mypage', function(req, res){
    userDAO.readByEmail(res.locals.sessObj.email).then(userObj=>{
        res.render("user/mypage", {email: userObj[0].email, name:userObj[0].name, birth: userObj[0].birth});
    });
    
});

// 인증
router.get('/update/auth', function(req, res){
    res.render("user/update_auth");
});

// 수정 폼
router.post('/update/auth', function(req, res){
    const session = sessionManager.readBySID(req.cookies['sid']);
    const promise = userDAO.readByEmail(session.email);
    promise.then(json_arr=>{
        // console.log(json_arr);
        if(json_arr.length === 1){
            const pwd_check = bcrypt.validateHash(req.body.pwd, json_arr[0]['pwd']);
            // console.log(pwd_check);
            if(pwd_check){
                res.render("user/update_myinfo", {email: json_arr[0].email, name:json_arr[0].name, birth: json_arr[0].birth});
            }else{
                res.send("<script>alert('패스워드가 일치하지 않습니다.'); history.back();</script>");
            }
        }
    });
});

// 내 정보 수정 폼
// router.get('/update/myinfo', function(req, res){
//     userDAO.readByEmail(res.locals.sessObj.email).then(userObj=>{
//         res.render("user/update_myinfo", {email: userObj[0].email, name:userObj[0].name, birth: userObj[0].birth});
//     });
// });

// 내 정보 수정 처리
router.post('/update/myinfo', function(req, res){
    const sid = req.cookies['sid'];
    sessionManager.updateMyInfo(sid, req.body.name, req.body.birth)
    const session = sessionManager.readBySID(sid);
    userDAO.update_myinfo(session.email, session.name, session.birth);
<<<<<<< HEAD
    // res.redirect("/user/mypage");
    res.send("<script>alert('내 정보가 수정되었습니다.'); location.href='/user/mypage'</script>");
=======
    res.redirect("/user/mypage");
>>>>>>> 16eb21b583094289d156ef1e3c8ec70c222bd605
});

// 패스워드 수정 폼
router.get('/update/password', function(req, res){
    res.render("user/update_password");
});

// 패스워드 수정 처리
router.post('/update/password', function(req, res){
    // console.log(req.body.new_pwd);
    // console.log(req.body.new_pwdCheck);
    if(req.body.new_pwd !== req.body.new_pwdCheck) return res.send("<script>alert('새 패스워드 확인이 필요합니다.'); history.back();</script>");
    const session = sessionManager.readBySID(req.cookies['sid']);
    const promise = userDAO.readByEmail(session.email);
    promise.then(json_arr=>{
        // console.log(json_arr);
        if(json_arr.length === 1){
            const pwd_check = bcrypt.validateHash(req.body.past_pwd, json_arr[0]['pwd']);
            // console.log(pwd_check);
            if(pwd_check){
                // console.log('패스워드 일치')
                userDAO.update_password(session.email, bcrypt.generateHash(req.body.new_pwd));
                // res.redirect("/user/mypage");
                res.send("<script>alert('패스워드가 수정되었습니다.'); location.href='/user/mypage'</script>");
            }else{
                res.send("<script>alert('기존 패스워드가 일치하지 않습니다.'); history.back();</script>");
            }
        }
    });

});

// 회원 탈퇴 폼
router.get('/withdrawal', function(req, res){
    res.render("user/withdrawal");
});

// 회원 탈퇴 처리
router.post('/withdrawal', function(req, res){
    const session = sessionManager.readBySID(req.cookies['sid']);
    const promise = userDAO.readByEmail(session.email);
    promise.then(json_arr=>{
        // console.log(json_arr);
        if(json_arr.length === 1){
            const pwd_check = bcrypt.validateHash(req.body.pwd, json_arr[0]['pwd']);
            // console.log(pwd_check);
            if(pwd_check){
                // console.log('패스워드 일치')
                userDAO.delete(session.email);
                // 쿠키 삭제, 세션 삭제
                res.clearCookie('sid');
                sessionManager.deleteSession(req.cookies['sid']);
                res.send("<script>alert('회원 탈퇴하였습니다.'); location.href='/'</script>");
            }else{
                res.send("<script>alert('기존 패스워드가 일치하지 않습니다.'); history.back();</script>");
            }
        }
    });
});

module.exports = router;