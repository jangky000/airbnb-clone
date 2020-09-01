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
        this.db.insert([json], function(err, newDoc){
            // console.log('레코드 삽입 결과: ' + newDoc);
            return newDoc;
        });
    }

    // id 일치 개수 조회
    count(id){
        this.db.count({id:id}, function(err, count){
            // console.log('테이블 레코드 전체 개수: ' + count);
            return count;
        });
    }

    // 조건 검색
    readById(id){
        return new Promise((resolve)=>{
            this.db.find({id: id}, function(err, docs){
                // 레코드 검색 결과
                // console.log(docs);
                resolve(docs);
            })
        });
    }

    // 수정
    update(id,pwd){
        this.db.update({id:id}, {$set:{pwd: pwd}}, function(err, numDocs){
            // console.log('레코드 수정 반영 수: ' + numDocs)
            return numDocs;
        });
    }

    // 삭제
    delete(id){
        db.remove({id:id}, function(err, numDocs){
            // console.log('레코드 삭제 반영 수: ' + numDocs)
            return numDocs
        });
    }
}


module.exports = UserDAO;