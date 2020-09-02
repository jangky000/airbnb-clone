window.onload = function(){
    document.getElementById('tab_rooms').addEventListener('click', show_rooms);
    document.getElementById('tab_experiences').addEventListener('click', show_experiences);
    
}

// nav tab 기능
// const tab_rooms = document.getElementById('tab_rooms');
// const tab_experiences = document.getElementById('tab_experiences');

// const search_rooms = document.getElementById('search_rooms');
// const search_experiences = document.getElementById('search_experiences');


function show_rooms(){
    document.getElementById('search_rooms').style.display='block';
    document.getElementById('search_experiences').style.display='none';
}

function show_experiences(){
    document.getElementById('search_rooms').style.display='none';
    document.getElementById('search_experiences').style.display='block';
}
