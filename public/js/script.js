// window.onload = function(){}

// addEventLister
document.getElementById('tab_rooms').addEventListener('click', toggle_search_tab);
document.getElementById('tab_experiences').addEventListener('click', toggle_search_tab);
document.getElementById('btn_user_nav').addEventListener('click', toggle_user_nav_menu);
document.querySelector("body").addEventListener('click', close_user_nav_menu);
document.getElementById("open_register").addEventListener('click', show_register_modal);
document.getElementById("open_login").addEventListener('click', show_login_modal);
document.querySelectorAll(".close").forEach(e=>{e.addEventListener('click', close_modal);});
document.querySelectorAll(".modal_overlay").forEach(e=>{e.addEventListener('click', close_modal);});


// header tab + search
function toggle_search_tab(){
    document.getElementById('search_rooms').classList.toggle('hidden');
    document.getElementById('search_experiences').classList.toggle('hidden');
}

// user_nav_modal 
function toggle_user_nav_menu(){
    document.getElementById('user_nav_menu').classList.toggle('hidden');
}

// 외부 영역을 클릭하면 메뉴바 닫기
function close_user_nav_menu(e){
    const menu = document.getElementById('user_nav_menu');
    const btn = document.getElementById('btn_user_nav');
    if(!(menu.contains(e.target) || btn.contains(e.target))&&!menu.classList.contains('hidden')){
        menu.classList.toggle('hidden');
    }
}

function show_register_modal(){
    toggle_user_nav_menu();
    const modal = document.getElementById("modal_register");
    modal.classList.toggle('hidden');
}

function show_login_modal(){
    toggle_user_nav_menu();
    const modal = document.getElementById("modal_login");
    modal.classList.toggle('hidden');
}


function close_modal(e){
    let parent = e.target.parentNode;
    while(!parent.classList.contains("modal") && parent !== document.querySelector("body")){
        parent = parent.parentNode;
    }
    const modal = parent;
    modal.classList.toggle('hidden');
}