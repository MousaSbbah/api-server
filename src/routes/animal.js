'use strict';
const express = require('express');
const DataCollection = require('../models/ data-collection-class.js');
const AnimalModel = require('../models/animal.js');
const animal = new DataCollection(AnimalModel);
const router = express.Router();

//Routing methods 
router.get('/',getAllAnimals)
router.get('/:id',getOneAnimal)
router.post('/',addAnimal)
router.put('/:id',updateAnimal)
router.delete('/:id',deleteAnimal)


//Routing Controller Functions
async function getAllAnimals(req, res, next) {
  try {
      const allAnimalsData = await animal.read();
      res.json(allAnimalsData);
  } catch (error) {
      next(error);
  }
}

async function getOneAnimal(req, res, next) {
  try {
      const animalData = await animal.read(req.params.id);
      res.json(animalData);
  } catch (error) {
      next(error);
  }
}

async function addAnimal(req, res, next) {
  try {
      const animalInfo = req.body;
      const newAnimal = await animal.creat(animalInfo);
      res.status(201).json(newAnimal);
  } catch (error) {
      next(error);
  }
}

async function updateAnimal(req, res, next) {
  try {
      const newInfo = req.body;
      const updatedInfo = await animal.update(req.params.id, newInfo);
      res.json(updatedInfo);
  } catch (error) {
      next(error);
  }
}

async function deleteAnimal(req, res, next) {
  try {
      const deletedAnimal = await animal.delete(req.params.id);
      res.json(await animal.read());
  } catch (error) {
      next(error);
  }
}


module.exports=router;
