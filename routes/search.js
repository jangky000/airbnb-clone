const express = require('express');
const router = express.Router();

const Rooms = require('../models/rooms')

const rooms = new Rooms();

function computePageButton(totalLength, curPage, pageLength, url, query){
    
    const page = []; // 페이징 정보를 담은 배열
    const numOfButton = 5; // 페이지 버튼 개수
    const maxPageNum = Math.ceil(totalLength/pageLength); // 최대 페이지
    let rurl = `${url.split('?')[0]}?location=${query.location}&checkin=${query.checkin}&checkout=${query.checkout}&guests=${query.guests}&page=`;
    
    curPage = parseInt(curPage);
    let startIndex; // 시작 페이지
    if( curPage < Math.ceil(numOfButton/2)){
        startIndex = 1;
    } else if(curPage > maxPageNum - Math.ceil(numOfButton/2)){
        startIndex = maxPageNum - numOfButton + 1;
    } else{
        startIndex = curPage-2;
    }
    const endIndex = (startIndex+numOfButton) > maxPageNum ? maxPageNum : (startIndex+numOfButton);

    if(curPage > 1) page.push({name:'<', href:rurl+(curPage-1)});
    for(let i=startIndex-1; i<endIndex; i++){
        if(i === curPage-1) page.push({name:i+1, href:rurl+(i+1), curPage:true});
        else page.push({name:i+1, href:rurl+(i+1)});
    }
    if(curPage < maxPageNum) page.push({name:'>', href:rurl+(curPage+1)});
    return [...page];
}

// 방 검색 결과
router.get('/rooms', function(req, res){
    const pageLength = 10;
    const curPage = req.query.page ? req.query.page : 1;
    let list = rooms.list(req.query.location, req.query.guests);
    const pageArr = computePageButton(list.length, curPage, pageLength, req.originalUrl, req.query);
    
    const count = list.length;
    list = list.slice((curPage-1)*pageLength, (curPage)*pageLength);
    
    res.render('search/rooms', {location:req.query.location, checkin: req.query.checkin, checkout:req.query.checkout, guests:req.query.guests, count: count, list: list, pageArr:pageArr});
});

module.exports = router;