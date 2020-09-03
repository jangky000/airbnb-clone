/*
rooms.json 파일 출처
J057_김태은  2:47 PM
    실제 airbnb 사이트에서 더미데이터를 크롤링해보았습니다.
    속성은
    place(“서울” | “제주” | “경주” |“전주” | “속초“)
    title description1, description2, price, image를 가지고있고, 데이터 개수는 place당 60개, 총 300개입니다.
    price는 할인가격, 이전가격, 가격이 스트링으로 넘어와서 정규식을 써줘야합니당..! ㅠ
*/

// nedb 로드
const Datastore = require('nedb');
// 자동 로드 및 데이터베이스 파일 생성
const db = new Datastore({filename: 'rooms.db', autoload: true});

class Rooms{
    constructor(){

    }

    // 삽입
    create(json_arr){
        return new Promise((resolve)=>{
            db.insert(json_arr, function(err, newDoc){
                // console.log('레코드 삽입 결과: ' + newDoc);
                resolve(newDoc);
            })
        });
    }

    // 일치 개수
    count(place, guests){
        return new Promise((resolve)=>{
            db.count({email:email}, function(err, count){
                // console.log('테이블 레코드 전체 개수: ' + count);
                resolve(count);
            })
        });
    }

    // 조건 검색
    readByEmail(place, guests){
        return new Promise((resolve)=>{
            db.find({email: email}, function(err, docs){
                // 레코드 검색 결과
                // console.log(docs);
                resolve(docs);
            })
        });
    }

    // 수정
    update_rooms(place, title, description1, description2, price, image){
        return new Promise((resolve)=>{
            db.update({email:email}, {$set:{name: name, birth:birth}}, function(err, numDocs){
                // console.log('레코드 수정 반영 수: ' + numDocs)
                resolve(numDocs);
            })
        });
    }

    // 삭제
    delete(email){
        return new Promise((resolve)=>{
            db.remove({email:email}, function(err, numDocs){
                // console.log('레코드 삭제 반영 수: ' + numDocs)
                resolve(numDocs);
            })
        });
    }

}

module.exports = Rooms

