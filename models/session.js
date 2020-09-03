const config = require("../env/config");

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