const mongoose = require("mongoose");

const timerSchema1 = mongoose.Schema({

  jobstarttime: {
    type: String
  },


  timesequence: {
    type: String


  },

  day: {
    type: String

  },

  date: {
    type: String,

  },

  stop: {
    type: Number,

  },

  jobstarted: {
    type: Boolean,
    default: false


  },
  timet: {
    type: String
  },
  jobupdatetime: {
    type: String
  },
  exacttime: {
    type: String
  },
  exacttime2: {
    type: String
  }






});

module.exports = mongoose.model("Time", timerSchema1);
