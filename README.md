# javascript-w1-airbnb
스프린트 1주차 웹 프로젝트 - airbnb

### 배포
url: https://week1airbnb.herokuapp.com/

### Week1 작업 분류
1. 환경설정
    - express 세팅
        - express 모듈 설치
        - 서버 띄우기
    - pug 세팅
        - pug 모듈 설치
        - view engine 설정
        - 정적 파일 연결
            - Express의 기본 제공 미들웨어 함수인 express.static을 사용
            - public 폴더 생성 
    - Embedded DB 설정
    - 라우팅 설정
    - Heroku 배포
2. 기능구현
    - 레이아웃 잡기
        - pug / css / js
            - 모듈화
            - 모달
            - email, password 유효성 검사
        
    - 회원가입/조회/수정/탈퇴 기능
        - 회원 관리
            - nedb CRUD
            - 회원 등록
                - 이메일 중복 검사
                - 패스워드 일치 검사
            - 회원 조회
            - 회원 정보 수정
                - 패스워드 인증
            - 회원 패스워드 수정
                - 기존 패스워드 일치 검사
                - 새 패스워드 일치 검사
            - 회원 삭제
                - 패스워드 일치 검사
        - 비밀번호 암호화
            - bcrypt

    - 로그인 세션/쿠키 기능
        - 세션 관리 객체
            - map 구조
            - 세션 sid 랜덤 생성
            - 세션 저장
            - 세션 조회
            - 세션 유지시간 업데이트
            - 세션 삭제
            - 세션 관리
            - 세션 DB에 저장
            - 세션 DB에서 불러오기
        - 쿠키 CRUD
    - 검색 기능
        - search 라우팅 추가
        - rooms 모델 추가
        - rooms.pug 추가
3. 반응형 작업


## Week1 개발 계획표
|월|화|수|목|금|
|---|---|---|---|---|
|express세팅 |Embedded DB 설정|로그인 세션/쿠키 기능|기능 개선|최종 정리 및 제출|
|pug 세팅 |라우팅 설정|라우팅 모듈화|문서 정리||
|heroku 배포 |레이아웃 잡기|디자인 개선|디자인 개선||
||회원가입/조회/수정/탈퇴 기능||||


### Week1 진행상황
|월|화|수|목|금|
|---|---|---|---|---|
|express세팅 완료|Embedded DB 설정 완료|로그인 세션 객체 및 CRUD|pug 모듈 개선 및 css 모듈화||
|pug 세팅 완료|라우팅 설정 완료|쿠키 CRD|쿠키 U 추가||
|heroku 배포 완료|회원가입/조회 기능 완료|pug 모듈화|header 회원 메뉴 모달 추가||
||간단한 pug 레이아웃 추가 |js 생성 및 탭 이벤트 추가|url 접근 제한||
||라우팅 모듈화 완료||회원정보 수정/탈퇴||
||||숙소 검색 기능 추가||

### Week2 작업분류
1. 페이지 구성
    1. 홈 페이지
        1. 레이아웃
            - header
            - nav
            - main
            - footer
        2. 검색창 탭 기능
        3. 회원
            - 모달 메뉴
                - 애니메이션 추가
            - 회원가입(모달)
                - 입력 형식 검사(js)
            - 로그인(모달)
                - 입력 형식 검사(js)
        4. 달력
            - js 구현
    2. 검색 결과 페이지
        1. 레이아웃
        2. 구글 지도 map 가져오기
        3. 예약
            - 예약 관리 모델
            - 예약 데이터 생성
            - rooms 데이터 개선
                - 위치 정보 저장
        4. 페이징

### Week2 개발 계획표
|월                     |화                     |수                 |목                 |금                 |
|---|---|---|---|---|
|1.1.3 회원가입(모달)   |1.1.3 입력 형식 검사(js)|예약 관리 모델      |추가 세부 작업     |문서 정리          |
|1.1.3 로그인(모달)     |1.1.4 달력 js 구현      |예약 데이터 생성    |검색 결과 페이징   |                   |
|1.2.1 레이아웃         |1.2.2 구글 지도 가져오기|rooms 데이터 개선   |                   |                   |
|1.1.1 레이아웃 flex 사용|                       |                   |                   |                   |
|                       |                       |                   |                   |                   |

### Weeek2 개발 진행상황
|월                     |화                     |수                     |목                 |금                 |
|---|---|---|---|---|
|1.1.1 이미 완료        |1.1.3 로그인(모달)     |1.1.4 달력 js 구현     |코드 개선            |                   |
|1.1.2 이미 완료        |1.1.3 입력 형식 검사(js)|1.2.2 구글 지도 가져오기|1.2.1 검색 페이징 추가|                   |
|1.1.1 레이아웃 flex 사용|1.2.1 레이아웃         |1.2.1 레이아웃 수정     |모달창 애니메이션 추가|                   |
|1.1.3 회원가입 모달    |                       |                       |검색창 애니메이션 추가|                   |
|                       |                       |                       |1.2.1 레이아웃 완성|                   |
|                       |                       |                       |JS 모듈 분리|                   |
|                       |                       |                       |회원정보 pug 수정|                   |
