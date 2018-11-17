const mongoose = require("mongoose");

const timerSchema = mongoose.Schema({

  startjob: {
    type: Date,
    default: Date,
    unique: true,
    multipleNulls: true


  },


  timesequence: {
    type: String,
    unique: true,
    multipleNulls: true

  },

  day: {
    type: Date,
    default: Date,
    unique: true,
    multipleNulls: true
  },

  date: {
    type: String
  },

  stop: {
    type: Number,
    unique: true,
    multipleNulls: true
  }




});

module.exports = mongoose.model("Timer", timerSchema);
