const express = require('express');
const router = express.Router();

const Rooms = require('../models/rooms')

const rooms = new Rooms();

// 방 검색 결과
router.get('/rooms', function(req, res){
    const list = rooms.list(req.query.location, req.query.guests);
    const count = list.length;
    res.render('search/rooms', {location:req.query.location, checkin: req.query.checkin, checkout:req.query.checkout, guests:req.query.guests, count: count, list: list});
});

module.exports = router;