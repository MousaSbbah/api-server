'use strict';
const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: { type: String },
  legs: { type: Number }
});

const AnimalModel = mongoose.model('Animal', animalSchema);

module.exports = AnimalModel;
