var express = require("express");
var router = express.Router();
const Issue = require("../models/issue");
var moment = require("moment");
var now = moment();



router.get('/test', (req, res, next) => {
  Issue.find(function (err, issues) {
    if (err)
      res.json(err);
    else {
      res.json(issues);
    }

  })
});

router.get('/ss', (req, res, next) => {


  let bscd =
    abc = new Date(Date.now()).toLocaleString();

  res.send(abc);
});

saveitem = function (newIssue, callback) {
  newIssue.save((err, issue) => {

    if (err) {

      callback(err)
    } else {
      callback(issue);
    }

  });
}
router.post('/post_route', (req, res, next) => {

  let date = moment().format('MMMM Do YYYY,h:mm A');
  let item = req.body;
  item.date = date;


  let newIssue = new Issue(item);
  saveitem(newIssue, function (err, resp, sucess) {
    if (err) {
      res.send(err)
    } else {
      res.send(resp);
    }

  });
});


router.put('/issue/:id', (req, res, next) => {

  Issue.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        issuename: req.body.issuename,
        issuecontent: req.body.issuecontent
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

router.delete('/issue/:id', (req, res, next) => {
  Issue.remove({
    _id: req.params.id
  }, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;
