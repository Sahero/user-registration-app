const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Activity = require('../models/activity');
//import {PagedData} from "../angular-src/src/app/model/paged-data";
//Append activity
router.post('/add', (req, res, next) => {
    let newActivity = new Activity({
        userId: req.body.userId,
        timestamp: new Date().toLocaleString(),
        log: req.body.log,
        status: req.body.status
    });

    Activity.addActivity(newActivity, (err, activity) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add new activity log ' + err });
        }
        else {
            res.json({ success: true, msg: 'Activity log added.' });
        }

    });
});

//Get activity
router.get('/getcount', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    Activity.find({ userId: req.user._id })
        .count()
        .exec(function (err, activities) {
            if (err) {
                res.json(err);
            } else {
                res.json(activities);
            }
        });

});

router.get('/getbypagenum', passport.authenticate('jwt', { session: false })
    , (req, res, next) => {
        //res.json(req.pageNum);
        //res.json(req.headers.pageNum);
        let pagenum = parseInt(req.headers.pagenum);
        let perPage = parseInt(req.headers.itemsperpage);
        //let pagenum = 2;

        //const perPage = 5;
        let start = (pagenum) * perPage;
        let end = start + perPage;

        Activity.find({ userId: req.user._id })
            .sort({_id: -1 })
            .skip(start)
            .limit(end - start)
            .exec(function (err, activities) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(activities);
                }
            });

    });
module.exports = router;
