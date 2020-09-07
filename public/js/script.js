// window.onload = function(){}

// addEventLister
document.getElementById('tab_rooms').addEventListener('click', toggle_search_tab);
document.getElementById('tab_experiences').addEventListener('click', toggle_search_tab);
document.getElementById('btn_user_nav').addEventListener('click', toggle_user_nav_menu);
document.querySelector("body").addEventListener('click', close_user_nav_menu);

// header tab + search
function toggle_search_tab(){
    document.getElementById('search_rooms').classList.toggle('hidden');
    document.getElementById('search_rooms').classList.toggle('show');
    document.getElementById('search_experiences').classList.toggle('hidden');
    document.getElementById('search_experiences').classList.toggle('show');
}

// user_nav_modal 
function toggle_user_nav_menu(){
    document.getElementById('user_nav_menu').classList.toggle('show');
    document.getElementById('user_nav_menu').classList.toggle('hidden');
}

function close_user_nav_menu(e){
    const menu = document.getElementById('user_nav_menu');
    const btn = document.getElementById('btn_user_nav');
    if(!(menu.contains(e.target) || btn.contains(e.target))){
        document.getElementById('user_nav_menu').classList.toggle('show');
        document.getElementById('user_nav_menu').classList.toggle('hidden');
    }
}

