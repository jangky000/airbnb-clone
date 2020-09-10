import { $ } from './utils/utilfunc.js';

(function init(){
    // 스크롤 이벤트
    window.addEventListener('scroll', scrollHandler);

    // mini search
    $("#mini_search button").addEventListener('click', show_search_bar);

})();

function scrollHandler(){
    if(window.scrollY >= 10 && !$('#search').classList.contains('scroll')){
        $('#header').classList.add('scroll');
        $('#search').classList.add('scroll');
        $('#header .headcenter .tab').classList.add('scroll');
        $('#mini_search').classList.add('scroll');
        $('#main').classList.add('scroll');
    }
    else if(window.scrollY < 10 && $('#search').classList.contains('scroll')){
        $('#header').classList.remove('scroll');
        $('#search').classList.remove('scroll');
        $('#header .headcenter .tab').classList.remove('scroll');
        $('#mini_search').classList.remove('scroll');
        $('#main').classList.remove('scroll');
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
