/*
rooms.json 파일 출처
J057_김태은  2:47 PM
    실제 airbnb 사이트에서 더미데이터를 크롤링해보았습니다.
    속성은
    place(“서울” | “제주” | “경주” |“전주” | “속초“)
    title description1, description2, price, image를 가지고있고, 데이터 개수는 place당 60개, 총 300개입니다.
    price는 할인가격, 이전가격, 가격이 스트링으로 넘어와서 정규식을 써줘야합니당..! ㅠ
*/


const rooms_json_arr = require('../rooms.json');

class Rooms{
    constructor(){

    }

    // 일치 개수
    count(place, guests){
        return rooms_json_arr.reduce((pre, value) => {
            const maxGuests = parseInt(/최대 인원 (.*)명/g.exec(value['description1'])[1]);
            if(value['place'] === place && maxGuests >= guests) pre += 1;
            return pre;
        }, 0);
    }

    // 조건 검색
    list(place, guests){
        return rooms_json_arr.reduce((pre, value) => {
            const maxGuests = parseInt(/최대 인원 (.*)명/g.exec(value['description1'])[1]);
            if(value['place'] === place && maxGuests >= guests) pre.push(value);
            return pre;
        }, []);
    }

}

module.exports = Rooms

// const rooms = new Rooms();
// console.log(rooms.count('서울', 5));
// console.log(rooms.list('서울', 5));

