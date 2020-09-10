import { getID } from './utils/utilfunc.js';

(function init(){
    // 회원 가입 체크 이벤트
    getID("email").addEventListener('input', checkEmail);
    getID("pwd").addEventListener('input', checkPwd);
    getID("pwdCheck").addEventListener('input', checkPwdCheck);
    getID("name").addEventListener('input', checkName);
    getID("birth").addEventListener('input', checkBirth);
})();

// 유효성 검사
function checkEmail(e){
    const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    checkMsg(e, reg, '이메일');
    
}

function checkPwd(e){
    // 비밀번호 형식
    // : 숫자, 특문 각 1회 이상, 영문은 1개 이상 사용하여 8자리 이상 입력 
    const reg = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{1,50}).{8,50}$/;
    checkMsg(e, reg, '패스워드');
}

function checkPwdCheck(e){
    // 비밀번호 일치 확인
    const pwd = e.target.parentElement.previousElementSibling.querySelector("input").value;
    const pwdCheck = e.target.value;
    let result_html = pwd === pwdCheck && pwd !== '' && pwdCheck !== '' ? `<div style='color:green;'>비밀번호 일치</div>` : `<div style='color:red;'>비밀번호를 확인해주세요</div>`;

    if(e.target.nextElementSibling){
        e.target.nextElementSibling.innerHTML = result_html;
    } else{
        e.target.parentElement.insertAdjacentHTML("beforeend", result_html);
    }
}

function checkName(e){
    // 특수문자 제거
    const reg = /^[가-힣]+$/;
    checkMsg(e, reg, '이름');
}

function checkBirth(e){
    // 생년월일 형식 체크
    const reg = /^(19[0-9][0-9]|20\d{2}).(0[0-9]|1[0-2]).(0[1-9]|[1-2][0-9]|3[0-1])$/;
    checkMsg(e, reg, '생년월일');
}

function checkMsg(e, reg, checkWhat){
    let result_html = null;
    if(e.target.value === ''){
        // ...을 입력해주세요.
        result_html = `<div style='color:red;'>${checkWhat}을 입력해주세요</div>`;
    }else{
        if(reg.test(e.target.value)){
            // 올바른 ... 형식입니다.
            result_html = `<div style='color:green;'>올바른 ${checkWhat} 형식입니다.</div>`;
        }else{
            // ... 형식이 올바르지 않습니다.
            result_html = `<div style='color:red;'>${checkWhat} 형식이 올바르지 않습니다.</div>`;
        }
    }

    if(e.target.nextElementSibling){
        e.target.nextElementSibling.innerHTML = result_html;
    } else{
        e.target.parentElement.insertAdjacentHTML("beforeend", result_html);
    }
}