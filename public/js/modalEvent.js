import { $, getID, $All } from './utils/utilfunc.js';

(function init(){
    // drop down Event
    getID('tab_rooms').addEventListener('click', show_rooms_tab);
    getID('tab_experiences').addEventListener('click', show_experience_tab);
    getID('btn_user_nav').addEventListener('click', toggle_user_nav_menu);
    $("body").addEventListener('click', close_user_nav_menu);

    // modal Event
    if(getID("open_register"))
        getID("open_register").addEventListener('click', show_register_modal);
    if(getID("open_login"))
        getID("open_login").addEventListener('click', show_login_modal);
    $All(".close").forEach(e=>{e.addEventListener('click', close_modal);});
    $All(".modal_overlay").forEach(e=>{e.addEventListener('click', close_modal);});
    getID("callRegister").addEventListener('click', loginToRegister);
})();

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