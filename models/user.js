// user db(테이블)에 CRUD 기능을 제공하는 model

// nedb 로드
const Datastore = require('nedb');
// 자동 로드 및 데이터베이스 파일 생성
const db = new Datastore({filename: 'user.db', autoload: true});

class UserDAO{
    constructor(){
        // this.db = new Datastore({filename: 'user.db', autoload: true});
    }
    // 삽입
    create(json){
        return new Promise((resolve)=>{
            db.insert([json], function(err, newDoc){
                // console.log('레코드 삽입 결과: ' + newDoc);
                resolve(newDoc);
            })
        });
    }

    // email 일치 개수 조회
    countEmail(email){
        return new Promise((resolve)=>{
            db.count({email:email}, function(err, count){
                // console.log('테이블 레코드 전체 개수: ' + count);
                resolve(count);
            })
        });
    }

    // 조건 검색
    readByEmail(email){
        return new Promise((resolve)=>{
            db.find({email: email}, function(err, docs){
                // 레코드 검색 결과
                // console.log(docs);
                resolve(docs);
            })
        });
    }

    // 회원정보 수정
    update_myinfo(email,name, birth){
        return new Promise((resolve)=>{
            db.update({email:email}, {$set:{name: name, birth:birth}}, function(err, numDocs){
                // console.log('레코드 수정 반영 수: ' + numDocs)
                resolve(numDocs);
            })
        });
    }

    // 패스워드 수정
    update_password(email,pwd){
        return new Promise((resolve)=>{
            db.update({email:email}, {$set:{pwd: pwd}}, function(err, numDocs){
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