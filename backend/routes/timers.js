var express = require("express");
var router = express.Router();
const Timer = require("../models/timer");
const User = require("../models/post");
var dateFormat = require('dateformat');
var moment = require("moment");

var now = moment();
var now1 = Date.now();
let day1 = now.format("MMMM Do YYYY");
console.log(now.format("MMMM Do YYYY"));





router.get('/test', (req, res, next) => {
  Timer.find(function (err, time) { ///get time
    if (err)
      res.json(err);
    else {
      res.json(time);
    }

  })
});



router.get('/time', (req, res, next) => {
  Timer.find(function (err, time) { ///get time
    if (err)
      res.json(err);
    else {
      res.json(time);
    }

  })
});



savetime = function (newTime, callback) {
  newTime.save((err, time) => {

    if (err) {

      callback(err)
    } else {
      callback(time);
    }

  });
}

let time = {
  timesequence: 0,
  day: dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")
};







router.post('/post_route', async (req, res, next) => { ///post time 


  let day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
  let day2 = dateFormat(new Date(), "yyyy-mm-dd");
  let date = now.format("MMMM Do YYYY");
  day1 = new Date().getMilliseconds();
  //console.log(day);
  //console.log(day2);
  startjob = req.body.startjob;

  var d = new Date(startjob);
  console.log(d);


  const error = await Timer.findOne({
    date: date

  });

  if (error) return res.status(400).send(error);
  let time = {
    timesequence: req.body.timesequence,
    startjob: req.body.startjob,
    day: day,
    date: date
  };

  let newTime = new Timer(time);
  savetime(newTime, function (error, resp) {
    if (error) {
      res.send(error)
    } else {
      res.send(resp);
    }

  });


  return day1;
});


validateDate = (startjob1) => {

  Timer.find({
      startjob: startjob1
    },
    function (error, result) {
      if (error) {
        console.log(error);
        return error;
      } else {
        return result;
      }

    });



}



router.put('/putRoute/:id', (req, res, next) => { //update


  Timer.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        timesequence: req.body.timesequence

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



module.exports = router;
