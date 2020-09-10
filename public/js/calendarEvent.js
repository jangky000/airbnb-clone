import { $, getID } from './utils/utilfunc.js';
import {drawCalendar, prevYearMonth, nextYearMonth } from './utils/calendar.js';

(function init(){
    // 달력 펼치기
    getID("rooms_checkin").addEventListener('click', searchDetailSelect);
    getID("rooms_checkout").addEventListener('click', searchDetailSelect);

    // 달력 조작
    getID("btn_previousMonth").addEventListener('click', renderPreviousCalendar);
    getID("btn_nextMonth").addEventListener('click', renderNextCalendar);
    getID("rooms_calendar").addEventListener('click', markDay);

    // 달력 초기 렌더링
    initCalendar();
})();

// calendar 제작
// 달력 초기 렌더링
function initCalendar(){
    const today = new Date();
    const nextMonth = nextYearMonth(today.getFullYear(), (today.getMonth()+1));

    drawCalendar('.left_calendar', today.getFullYear(), (today.getMonth()+1)); // get month: 0 ~ 11;
    drawCalendar('.right_calendar', nextMonth.year, nextMonth.month);
};

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