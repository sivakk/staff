var express = require("express");
var router = express.Router();
const Time = require("../models/time");
var dateFormat = require('dateformat');
var moment = require("moment");
var now = moment();
var now1 = Date.now();
let day1 = now.format("MMMM Do YYYY");
console.log(now.format("MMMM Do YYYY"));




router.get('/time', (req, res, next) => {
  Time.find(function (err, time) { ///get time
    if (err)
      res.json(err);
    else {
      res.json(time);
    }

  })
});
savetime = function (newTime, callback) {
  newTime.save((err, time1) => {

    if (err) {

      callback(err)
    } else {
      callback(time1);
    }

  });
}


router.post('/post_route', (req, res, next) => { ///post time 


  let jobstarttime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
  let day2 = dateFormat(new Date(), "yyyy-mm-dd");
  let date1 = now.format("MMMM Do YYYY");
  let timet = now.format("h:MM:ss");
  day1 = new Date().getMilliseconds();

  jobstarted = req.body.jobstarted;
  jobstarttime = req.body.jobstarttime;
  timet = req.body.timet;
  jobupdatetime = req.body.jobupdatetime;


  let time1 = {
    timesequence: 0,
    startjob: 0,
    jobstarttime: jobstarttime,
    date: date1,
    jobstarted: jobstarted,
    jobupdatetime: jobupdatetime || 0,
    exacttime2: 0
  };
  console.log(time1);

  let newTime = new Time(time1);
  savetime(newTime, function (error, resp) {
    if (error) {
      res.send(error)
    } else {
      res.send(resp);
    }

  });



});


router.put('/putroute/', (req, res, next) => {

  Time.findOneAndUpdate({
      date: req.body.date
    }, {
      $set: {
        jobstarted: req.body.jobstarted,
        jobstarttime: req.body.jobstarttime,
        exacttime: req.body.exacttime,


      }
    },
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result)
      }

    });
});


router.put('/putroutestoptime/', (req, res, next) => {

  console.log(req.body.exacttime2);
  console.log(req.body.date)

  Time.findOneAndUpdate({
      date: req.body.date
    }, {
      $set: {
        exacttime2: req.body.exacttime2
      }
    },
    function (err, result1) {
      if (err) {
        res.json(err);
      } else {
        res.json(result1)
      }

    });
});





module.exports = router;
