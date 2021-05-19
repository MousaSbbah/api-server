'use strict';
const express = require('express');
const DataCollection = require('../models/ data-collection-class');
const StudentModel = require('../models/student.js');
const student = new DataCollection(StudentModel);
const router = express.Router();

//Routing methods 
router.get('/',getAllStudents)
router.get('/:id',getOneStudent)
router.post('/',addStudent)
router.put('/:id',updateStudent)
router.delete('/:id',deleteStudent)

//Routing Controller Functions
async function getAllStudents(req, res, next) {
  try {
      const allStudentsData = await student.read();
      res.json(allStudentsData);
  } catch (error) {
      next(error);
  }
}

async function getOneStudent(req, res, next) {
  try {
      const studentData = await student.read(req.params.id);
      res.json(studentData);
  } catch (error) {
      next(error);
  }
}

async function addStudent(req, res, next) {
  try {
      const studentInfo = req.body;
      const newStudent = await student.creat(studentInfo);
      res.status(201).json(newStudent);
  } catch (error) {
      next(error);
  }
}

async function updateStudent(req, res, next) {
  try {
      const newInfo = req.body;
      const updatedInfo = await student.update(req.params.id, newInfo);
      res.json(updatedInfo);
  } catch (error) {
      next(error);
  }
}

async function deleteStudent(req, res, next) {
  try {
      const deletedStudent = await student.delete(req.params.id);
      res.json(await student.read());
  } catch (error) {
      next(error);
  }
}


module.exports=router;
