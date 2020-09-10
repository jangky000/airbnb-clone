export function makeCalendar(year, month){
  // 사용자 선택 값 가져오기
  const checkin  = document.getElementById("rooms_checkin").querySelector("input").value;
  const checkout  = document.getElementById("rooms_checkout").querySelector("input").value;

  // 데이터
  const dayNameList = ['일', '월', '화', '수', '목', '금', '토'];
  const firstDay = new Date(year, month-1, 1);
  const lastDay = new Date(year, month, 0);
  const today = new Date();

  // 렌더링
  // 컨테이너
  const calendarContainer = document.createElement('div');
  calendarContainer.classList.add('calendarContainer');
  calendarContainer.dataset.year = year;
  calendarContainer.dataset.month = month;

  // 제목
  const calendarTitle = document.createElement('h2');
  calendarTitle.innerText = `${year}년 ${month}월`;
  calendarContainer.append(calendarTitle);

  // 테이블
  const calendarTable = document.createElement('table');

  // 일월화수목금토
  const tableHead = document.createElement('tr');
  dayNameList.forEach(dayname => {
    const tableCell = document.createElement('th');
    tableCell.innerText = dayname;
    tableHead.append(tableCell);
  });
  calendarTable.append(tableHead);

  // 테이블 바디 만들기
  let startCount;
  let countDay = 0;
  const todayStr = today.getFullYear() + '.' + (today.getMonth()+1).toString().padStart(2, '0') + '.' + (today.getDate()+1).toString().padStart(2, '0');

  const tbody = document.createElement('tbody');
  for (let i = 0; i < 6; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const td = document.createElement('td');
      if (i === 0 && !startCount && j === firstDay.getDay()) {
        startCount = 1;
      }
      if (!startCount) {
      } else {
        let fullDate = year + '.' + month.toString().padStart(2, '0') + '.' + (countDay+1).toString().padStart(2, '0');
        td.classList.add('day');
        td.classList.add((todayStr > fullDate) ? 'notAvailable' : 'available');
        if(checkin && checkin === fullDate) td.classList.add('checked');
        if(checkout && checkin < fullDate && checkout > fullDate) td.classList.add('between');
        if(checkout && checkout === fullDate) td.classList.add('checked');
        td.dataset.date = `${month}월 ${countDay + 1}일`;
        td.dataset.fdate = fullDate;
      }
      td.textContent = (startCount) ? ++countDay : '';
      if (countDay === lastDay.getDate()) { 
        startCount = 0; 
      }
      tr.append(td);
    }
    if (countDay >= lastDay.getDate()) break;
    tbody.append(tr);
  }
  calendarTable.append(tbody);

  calendarContainer.append(calendarTable);

  return calendarContainer;
}

export function prevYearMonth(currYear, currMonth){
  currYear = parseInt(currYear);
  currMonth = parseInt(currMonth);
  if (currMonth === 1) return {year: currYear - 1, month: 12};
  else return {year: currYear, month: currMonth- 1};
}

export function nextYearMonth(currYear, currMonth){
  currYear = parseInt(currYear);
  currMonth = parseInt(currMonth);
  if (currMonth === 12) return {year: currYear + 1, month: 1};
  else return {year:currYear, month: currMonth+1};
}

export function drawCalendar(selector, year, month){
  const calendar = document.querySelector(selector);
  calendar.innerHTML = "";
  calendar.append(makeCalendar(year, month));
}