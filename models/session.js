// 세션을 DB로 저장하는 이유, 
// 서버가 꺼지는 상황에서도 세션을 저장 유지하기 위해서 -> REDIS에서 세션을 관리하는 것에서 착안

const config = require("../env/config");

/*
Session 내부 객체
       - session: Tomcat(WAS: Web Application Server) 서버에서 접속한
         사용자마다 고유하게 할당되는 메모리, Tomcat 서버에서 관리하며
         다른 사용자의 메모리는 보안상 접근을 할 수 없음, 기본적으로 서버 차원에서
         보안 설정을 함으로 해킹이 매우 어려움.
2) 서버의 메모리상에 저장되는 정보로 보안성이 높으며, 접속한 사용자 별로 
      세션 메모리가 할당되며, 모든 페이지에서 session 객체를 사용할 수 있습니다. 
      사용자가 서버에 접속하면 할당되고 브러우저를 닫거나 로그아웃하면 
      session 정보가 저장된 메모리가 자동으로 해제. 
5) 서버상에서 세션의 유지시간(수명)은 초단위로  
      <% session.setMaxInactiveInterval(600); %>로 지정합니다. 
      만약 사용자가 JSP페이지를 열어놓고 링크(<A>)를 클릭하지 않으면, 메모리 관리
      차원에서 session 메모리는 삭제됩니다.  
      예) 톰캣 서버: 30분, 국민은행은 5분, 신한은행 10분후 자동 로그아웃,  
           세션 연장은 링크를 클릭하는 역할을 수행함. 
*/

// nedb 로드
// const Datastore = require('nedb');
// 자동 로드 및 데이터베이스 파일 생성
// const db = new Datastore({filename: 'session.db', autoload: true});

// 참고: https://electronic-moongchi.tistory.com/83
Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var d = this;
    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear(); // 년 (4자리)
            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
            case "dd": return d.getDate().zf(2); // 일 (2자리)
            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
            case "mm": return d.getMinutes().zf(2); // 분 (2자리)
            case "ss": return d.getSeconds().zf(2); // 초 (2자리)
            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
            default: return $1;
        }
    });
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };




class SessionManager{
    constructor(){
        this.session = new Map();
        // session에는 sid, email, name의 정보 저장 들어감
        // session[sid] = {email: "user@gmail.com", name: "사용자", createDate:"", expireDate:"", lastAccessDate:""}
    }

    readBySID(sid){
        const copy = {...this.session[sid]};
        delete copy['createDate'];
        delete copy['expireDate'];
        delete copy['lastAccessDate'];
        return copy;
    }

    generateSID(){
        // 랜덤 SID 생성
        // 중복 검사 추가하기
        const digit = 20;
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < digit; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    saveSession(sid, email, name, maxAge){
        // 메모리에서 관리되고 있는 session 정보를 파일로 저장 -> 변경 발생 시 변경 사항 저장
        // {sid:"asd", email:"user@gmail.com", name: "사용자", createDate:"", expireDate:"", lastAccessDate:""} 형태
        const current = new Date();
        const expire = new Date()
        expire.setMilliseconds(current.getMilliseconds() + maxAge);
        this.session[sid] = {email:email, name: name, createDate: current.format('yyyy-MM-dd HH:mm:ss'), expireDate:expire.format('yyyy-MM-dd HH:mm:ss'), lastAccessDate:current.format('yyyy-MM-dd HH:mm:ss')};
    }

    updateSession(sid, maxAge){
        const current = new Date();
        const expire = new Date()
        expire.setMilliseconds(current.getMilliseconds() + maxAge);

        this.session[sid] = {...this.session[sid], expireDate:expire.format('yyyy-MM-dd HH:mm:ss'), lastAccessDate: current.format('yyyy-MM-dd HH:mm:ss')};
        // console.log("update!");
        // console.log(this.session[sid]);
    }

    updateMyInfo(sid, name, birth){
        this.session[sid] = {...this.session[sid], name:name, birth: birth};
    }

    deleteSession(sid){
        // 로그아웃, 브라우저 닫을 때, 타임아웃 시 삭제
        delete this.session[sid];
        console.log('delete session!');
        console.log(this.session[sid]);
    }

    loadSession(){
        // map 형태로 변환
    }

    garbageCollecting(){
        setInterval(()=>{
            const current = new Date().format('yyyy-MM-dd HH:mm:ss');
            for(let sid of Object.keys(this.session)){
                // console.log(this.session[sid].expireDate);
                // console.log(current);
                if(this.session[sid].expireDate < current){
                    this.deleteSession(sid)
                }
            }
        }, 3000);

    }

}

const sessionManager = new SessionManager();
sessionManager.garbageCollecting();

module.exports = sessionManager;