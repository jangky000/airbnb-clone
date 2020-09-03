const express = require('express');
const router = express.Router();

<<<<<<< HEAD
const Rooms = require('../models/rooms')

const rooms = new Rooms();

// 방 검색 결과
router.get('/rooms', function(req, res){
    const list = rooms.list(req.query.location, req.query.guests);
    const count = list.length;
    res.render('search/rooms', {location:req.query.location, checkin: req.query.checkin, checkout:req.query.checkout, guests:req.query.guests, count: count, list: list});
=======
// 방 검색 결과
router.get('/rooms', function(req, res){
    // console.log("방 검색");
    // console.log(req.query);
    res.render('search/rooms', {location: req.query.location, checkin: req.query.checkin, checkout:req.query.checkout, guests:req.query.guests});
>>>>>>> 16eb21b583094289d156ef1e3c8ec70c222bd605
});

module.exports = router;