'use strict';
const server = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server.server);

describe('API Student testing', () => {
    let id;
    let newStudent = {
        name: 'Mousa',
        age: 25
    }
    it('should create a new student ', async () => {
        const response = await request.post('/student').send(newStudent);

        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('Mousa');
        expect(response.body.age).toEqual(25);
        expect(response.body._id).toBeTruthy();

        id = response.body._id;
    });
    it('Should Read all Student',async()=>{
        const response = await request.get('/student');

        expect(response.status).toEqual(200)
        expect(response.body).toEqual([{"name": newStudent.name,"age": 25, "_id": id,"__v": 0}])
    });

    let newInfo = {
        name: 'Mosa',
        age : 24 
    }
    it('should Update the student information' , async()=> {

        const response = await request.put(`/student/${id}`).send(newInfo);

        expect(response.body.name).toEqual('Mosa');
        expect(response.body.age).toEqual(24);
        expect(response.body._id).toEqual(id);
    });
    it('Should Read one Student Info',async()=>{
        const response = await request.get(`/student/${id}`);
        expect(response.status).toEqual(200)
        expect(response.body[0].name).toEqual('Mosa');
        expect(response.body[0].age).toEqual(24);
        expect(response.body[0]._id).toEqual(id);
        
    });
    it('Should delete  Student Info',async()=>{
        const deleteStudent = await request.delete(`/student/${id}`);
        const tryReadDeletedStudent = await request.get(`/student/${id}`);
        expect(tryReadDeletedStudent.status).toEqual(200);
        
    });
});

describe('API Animal testing', () => {
    let id;
    let newAnimal = {
        name: 'dog',
        legs: 4
    }
    it('should create a new animals ', async () => {
        const response = await request.post('/animal').send(newAnimal);

        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('dog');
        expect(response.body.legs).toEqual(4);
        expect(response.body._id).toBeTruthy();

        id = response.body._id;
    });
    it('Should Read all Animals',async()=>{
        const response = await request.get('/animal');

        expect(response.status).toEqual(200)
        expect(response.body).toEqual([{"name": newAnimal.name,"legs": newAnimal.legs, "_id": id,"__v": 0}])
    });

    let newInfo = {
        name: 'fish',
        legs : 0 
    }
    it('should Update the animal information' , async()=> {

        const response = await request.put(`/animal/${id}`).send(newInfo);

        expect(response.body.name).toEqual('fish');
        expect(response.body.legs).toEqual(0);
        expect(response.body._id).toEqual(id);
    });
    it('Should Read one Animal Info',async()=>{
        const response = await request.get(`/animal/${id}`);
        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual('fish');
        expect(response.body[0].legs).toEqual(0);
        expect(response.body[0]._id).toEqual(id);
        
    });
    it('Should delete  Animal Info',async()=>{
        const deleteAnimal = await request.delete(`/animal/${id}`);
        const tryReadDeletedAnimal = await request.get(`/animal/${id}`);
        expect(tryReadDeletedAnimal.status).toEqual(200);
        
    });
});

describe('404 Error Handler', ()=>{
    it('Should return 404 for bad rout',async ()=>{
    const response = await request.get('/badRout')
    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual('Not Found');
    })
    it('Should return 404 for bad method',async ()=>{
        const response = await request.delete('/student')
        expect(response.status).toEqual(404);
        expect(response.body.message).toEqual('Not Found');
        })
    
});

describe('500 Error Handler', ()=>{
    it('should Update the animal information' , async()=> {

        const response = await request.post(`/student`).send('aa');
        expect(response.status).toEqual(500);
    })
    
});

describe('Home Rout', ()=>{
    it('should send server info' , async()=> {

        const response = await request.get(`/`);
        expect(response.text).toEqual('Server Is Working');
    })
    
});