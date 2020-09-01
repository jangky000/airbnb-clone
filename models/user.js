// user db(테이블)에 CRUD 기능을 제공하는 model

// nedb 로드
const Datastore = require('nedb');
// 자동 로드 및 데이터베이스 파일 생성
// const db = new Datastore({filename: 'user.db', autoload: true});

class UserDAO{
    constructor(){
        this.db = new Datastore({filename: 'user.db', autoload: true});
    }
    // 삽입
    create(json){
        return new Promise((resolve)=>{
            this.db.insert([json], function(err, newDoc){
                // console.log('레코드 삽입 결과: ' + newDoc);
                resolve(newDoc);
            })
        });
    }

    // id 일치 개수 조회
    count(email){
        return new Promise((resolve)=>{
            this.db.count({email:email}, function(err, count){
                // console.log('테이블 레코드 전체 개수: ' + count);
                resolve(count);
            })
        });
    }

    // 조건 검색
    readByEmail(email){
        return new Promise((resolve)=>{
            this.db.find({email: email}, function(err, docs){
                // 레코드 검색 결과
                // console.log(docs);
                resolve(docs);
            })
        });
    }

    // 수정
    update(email,pwd){
        return new Promise((resolve)=>{
            this.db.update({email:email}, {$set:{pwd: pwd}}, function(err, numDocs){
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


module.exports = UserDAO;