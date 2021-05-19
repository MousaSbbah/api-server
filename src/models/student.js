'use strict';
const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  grade: { type: Number }
});

const StudentModel = mongoose.model('Student', studentSchema);

module.exports = StudentModel;
