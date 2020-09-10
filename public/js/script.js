import { $, getID, $All } from './utils/utilfunc.js';
import {drawCalendar, prevYearMonth, nextYearMonth } from './utils/calendar.js';

window.onload = function(){
    // 스크롤 이벤트
    window.addEventListener('scroll', scrollHandler);

    // mini search
    $("#mini_search button").addEventListener('click', show_search_bar);

    // drop down Event
    getID('tab_rooms').addEventListener('click', show_rooms_tab);
    getID('tab_experiences').addEventListener('click', show_experience_tab);
    getID('btn_user_nav').addEventListener('click', toggle_user_nav_menu);
    $("body").addEventListener('click', close_user_nav_menu);

    // modal Event
    getID("open_register").addEventListener('click', show_register_modal);
    getID("open_login").addEventListener('click', show_login_modal);
    $All(".close").forEach(e=>{e.addEventListener('click', close_modal);});
    $All(".modal_overlay").forEach(e=>{e.addEventListener('click', close_modal);});
    getID("callRegister").addEventListener('click', loginToRegister);

    // 회원 가입 체크 이벤트
    getID("email").addEventListener('input', checkEmail);
    getID("pwd").addEventListener('input', checkPwd);
    getID("pwdCheck").addEventListener('input', checkPwdCheck);
    getID("name").addEventListener('input', checkName);
    getID("birth").addEventListener('input', checkBirth);

    // 달력 펼치기
    getID("rooms_checkin").addEventListener('click', searchDetailSelect);
    getID("rooms_checkout").addEventListener('click', searchDetailSelect);

    // 달력 조작
    getID("btn_previousMonth").addEventListener('click', renderPreviousCalendar);
    getID("btn_nextMonth").addEventListener('click', renderNextCalendar);
    getID("rooms_calendar").addEventListener('click', markDay);

}


function scrollHandler(){
    if(window.scrollY >= 10 && !$('#search').classList.contains('scroll')){
        $('#header').classList.add('scroll');
        $('#search').classList.add('scroll');
        $('#header .headcenter .tab').classList.add('scroll');
        $('#mini_search').classList.add('scroll');
    }
    else if(window.scrollY < 10 && $('#search').classList.contains('scroll')){
        $('#header').classList.remove('scroll');
        $('#search').classList.remove('scroll');
        $('#header .headcenter .tab').classList.remove('scroll');
        $('#mini_search').classList.remove('scroll');
    }
        
}

function show_search_bar(e){
    if($('#search').classList.contains('scroll')){
        // $('#header').classList.remove('scroll');
        $('#search').classList.remove('scroll');
        $('#header .headcenter .tab').classList.remove('scroll');
        $('#mini_search').classList.remove('scroll');
    }
}



// header tab + search
function show_rooms_tab(){
    if(getID('search_rooms').classList.contains('hidden')){
        getID('tab_rooms').classList.toggle('tab_selected');
        getID('tab_experiences').classList.toggle('tab_selected');
        getID('search_rooms').classList.remove('hidden');
        getID('search_experiences').classList.add('hidden');
    }
}

function show_experience_tab(){
    if(getID('search_experiences').classList.contains('hidden')){
        getID('tab_rooms').classList.toggle('tab_selected');
        getID('tab_experiences').classList.toggle('tab_selected');
        getID('search_rooms').classList.add('hidden');
        getID('search_experiences').classList.remove('hidden');
    }
}

// user_nav_menu 드랍다운
function toggle_user_nav_menu(){
    getID('user_nav_menu').classList.toggle('hidden');
}

// 외부 영역을 클릭하면 메뉴바 닫기
function close_user_nav_menu(e){
    const menu = getID('user_nav_menu');
    const btn = getID('btn_user_nav');
    if(!(menu.contains(e.target) || btn.contains(e.target))&&!menu.classList.contains('hidden')){
        menu.classList.toggle('hidden');
    }

    const rooms_calendar = getID('rooms_calendar');
    const rooms_checkin = getID('rooms_checkin');
    const rooms_checkout = getID('rooms_checkout');
    if(!(rooms_calendar.contains(e.target) || rooms_checkin.contains(e.target) || rooms_checkout.contains(e.target))&&!rooms_calendar.classList.contains('hidden')){
        rooms_calendar.classList.toggle('hidden');
    }
    
}

// 모달
function show_register_modal(){
    toggle_user_nav_menu();
    const modal = getID("modal_register");
    modal.classList.toggle('hidden');
}

function show_login_modal(){
    toggle_user_nav_menu();
    const modal = getID("modal_login");
    modal.classList.toggle('hidden');
}

// 모달창 닫기
function close_modal(e){
    let parent = e.target.parentNode;
    while(!parent.classList.contains("modal") && parent !== $("body")){
        parent = parent.parentNode;
    }
    const modal = parent;
    modal.classList.toggle('hidden');
}

// move from login to register
function loginToRegister(e){
    close_modal(e);
    show_register_modal(e);
}


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

// calendar 제작
// 달력 초기 렌더링
(function initCalendar(){
    const today = new Date();
    const nextMonth = nextYearMonth(today.getFullYear(), (today.getMonth()+1));

    drawCalendar('.left_calendar', today.getFullYear(), (today.getMonth()+1)); // get month: 0 ~ 11;
    drawCalendar('.right_calendar', nextMonth.year, nextMonth.month);
})();

function searchDetailSelect(e){
    getID("rooms_checkin").classList.remove("selected");
    getID("rooms_checkout").classList.remove("selected");
    e.currentTarget.classList.add("selected");
    if(getID("rooms_calendar").classList.contains("hidden")){
        getID("rooms_calendar").classList.toggle("hidden");
    }
}


function markDay(e){
    e.stopPropagation(); // 상위로 이벤트 발생을 막음
    if(e.target.classList.contains('available')){
        const rooms_checkin  = getID("rooms_checkin");
        const rooms_checkout  = getID("rooms_checkout");

        if(rooms_checkin.classList.contains('selected')){
            rooms_checkin.querySelector(".checkinDate").textContent = e.target.dataset.date;
            rooms_checkin.querySelector("input").value = e.target.dataset.fdate;
            rooms_checkin.classList.toggle('selected');
            rooms_checkout.classList.toggle('selected');
            renderCurrentCalendar();
        } else if(rooms_checkout.classList.contains('selected')){
            rooms_checkout.querySelector(".checkoutDate").textContent = e.target.dataset.date;
            rooms_checkout.querySelector("input").value = e.target.dataset.fdate;
            renderCurrentCalendar();
        }
    }
}   

function renderCurrentCalendar(){
    const calendarContainer = $('.left_calendar .calendarContainer');
    const year = calendarContainer.dataset.year;
    const month = calendarContainer.dataset.month;
    const nextMonth = nextYearMonth(year, month);

    drawCalendar('.left_calendar', year, month); // get month: 0 ~ 11;
    drawCalendar('.right_calendar', nextMonth.year, nextMonth.month);
}

function renderPreviousCalendar(){
    const calendarContainer = $('.left_calendar .calendarContainer');
    const year = calendarContainer.dataset.year;
    const month = calendarContainer.dataset.month;
    const prevMonth = prevYearMonth(year, month);

    drawCalendar('.left_calendar', prevMonth.year, prevMonth.month); // get month: 0 ~ 11;
    drawCalendar('.right_calendar', year, month);
}

function renderNextCalendar(){
    const calendarContainer = $('.right_calendar .calendarContainer');
    const year = calendarContainer.dataset.year;
    const month = calendarContainer.dataset.month;
    const nextMonth = nextYearMonth(year, month);

    drawCalendar('.left_calendar', year, month); // get month: 0 ~ 11;
    drawCalendar('.right_calendar', nextMonth.year, nextMonth.month);
}