const express = require('express');
const router = express.Router();

// 방 검색 결과
router.get('/rooms', function(req, res){
    // console.log("방 검색");
    // console.log(req.query);
    res.render('search/rooms', {location: req.query.location, checkin: req.query.checkin, checkout:req.query.checkout, guests:req.query.guests});
});

module.exports = router;