// window.onload = function(){}

// addEventLister
document.getElementById('tab_rooms').addEventListener('click', show_rooms);
document.getElementById('tab_experiences').addEventListener('click', show_experiences);
document.getElementById('btn_user_nav').addEventListener('click', toggle_user_nav_modal);

// header tab
function show_rooms(){
    document.getElementById('search_rooms').style.display='block';
    document.getElementById('search_experiences').style.display='none';
}

function show_experiences(){
    document.getElementById('search_rooms').style.display='none';
    document.getElementById('search_experiences').style.display='block';
}

// user_nav_modal 
// -> ?? 효율적인지 모르겠다.
function toggle_user_nav_modal(){
    if(document.getElementById('user_nav_modal').style.display === 'none'){
        document.getElementById('user_nav_modal').style.display = 'block';
    }else{
        document.getElementById('user_nav_modal').style.display = 'none';
    }
}