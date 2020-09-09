// export function makeCalendar(year, month) {
//     // dow : 요일
//     const calendar = document.createElement('li');
//     const yearmonth = document.createElement('h2');
//     yearmonth.innerText = `${year}년 ${month}월`;
//     calendar.appendChild(yearmonth);
  
//     const dowDiv = document.createElement('div');
//     ['일', '월', '화', '수', '목', '금', '토'].forEach(dow => {
//       const dowSpan = document.createElement('span');
//       dowSpan.innerText = dow;
//       dowDiv.appendChild(dowSpan);
//     });
//     calendar.append(dowDiv);
  
//     const todayDate = new Date();
//     const lastDate = new Date(year, month, 0);
//     const startDate = new Date(year, month - 1, 1);
  
//     const todayDay = todayDate.getDate();
//     const todayMonth = todayDate.getMonth() + 1;
//     const todayYear = todayDate.getFullYear();
//     const lastDay = lastDate.getDate();
//     const startDOW = startDate.getDay();
  
//     let date = 1,
//       flag = false;
//     for (let i = 0; i < 6; i++) {
//       const weekDiv = document.createElement('div');
//       for (let j = 0; j < 7; j++) {
//         const weekSpan = document.createElement('span');
//         if (startDOW === j) flag = true;
//         if (flag && date <= lastDay) {
//           const isRestday =
//             (todayDay <= date && todayMonth == month && todayYear == year) ||
//             (todayYear <= year && todayMonth < month) ||
//             todayYear < year;
//           if (isRestday) {
//             weekSpan.classList.add('header__calendar-restday');
//             weekSpan.id = `${month}월 ${date}일`;
//           } else {
//             weekSpan.classList.add('header__calendar-oldday');
//           }
//           weekSpan.innerText = date++;
//           weekDiv.appendChild(weekSpan);
//           continue;
//         }
//         weekDiv.appendChild(weekSpan);
//       }
//       calendar.append(weekDiv);
//       if (date > lastDay) break;
//     }
//     return calendar;
//   }
  
export function makeCalendar(year, month){
    // 컨테이너
    const calendarContainer = document.createElement('div');

    // 2020년 9월
    const calendarTitle = document.createElement('h2');
    calendarTitle.innerText = `${year}년 ${month}월`;
    calendarContainer.append(calendarTitle);

    // 테이블
    const calendarTable = document.createElement('table');

    // 일월화수목금토
    const tableHead = document.createElement('tr');
    ['일', '월', '화', '수', '목', '금', '토'].forEach(dayname => {
      const tableCell = document.createElement('th');
      tableCell.innerText = dayname;
      tableHead.append(tableCell);
    });
    calendarTable.append(tableHead);

    // 날짜 추가
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);




    calendarContainer.append(calendarTable);


    return calendarContainer;
}

// export function getNextMonth(year, month) {
//   if (month === 12) return [year + 1, 1];
//   else return [year, month + 1];
// }

// export function getPreviousMonth(year, month) {
//   if (month === 1) return [year - 1, 12];
//   else return [year, month - 1];
// }

// export function compareDate(date1, date2) {
//   const [month1, day1] = date1.match(/(\d+)/g).map(d => Number(d));
//   const [month2, day2] = date2.match(/(\d+)/g).map(d => Number(d));

//   if (month1 > month2) return true;
//   else if (month1 < month2) return false;
//   else if (day1 > day2) return true;
//   else return false;
// }
