//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const User = require('../models/user.model');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index');
const server = require('../api/routes');

const should = chai.should();

let login = new Date().getTime().toString();
let token = null;
let user = null;
let room_id = null;

chai.use(chaiHttp);

describe('Users', () => {
    it('it should create anonimous user', (done) => {
        chai.request(server)
            .put('/api/public/v1/user/init')
            .send({
                name: 'test',
                anonymous: true
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.code.should.be.equal(20000);
                res.body.should.have.property('message');
                res.body.data.should.have.property('token');

                token = res.body.data.token;

                done();
            });
    });

    it('it should create new user with login and password', (done) => {
        chai.request(server)
            .put('/api/public/v1/user/init')
            .send({
                name: 'Test',
                login: login,
                password: '123456',
                anonymous: false
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.code.should.be.equal(20000);
                res.body.should.have.property('message');
                res.body.data.should.have.property('token');

                done();
            })
    });

    it('it should return error, because the user with same login already exist', done => {
        chai.request(server)
            .put('/api/public/v1/user/init')
            .send({
                name: 'Test',
                login: login,
                password: '123456',
                anonymous: false
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.code.should.be.equal(20001);
                res.body.should.have.property('message');
                res.body.message.should.not.be.empty;

                done();
            })
    });

    it('it should validate token', done => {
        chai.request(server)
            .get('/api/public/v1/user/validate')
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.code.should.be.equal(20000);
                res.body.data.should.have.property('name');

                user = res.body.data._id;

                done();
            })
    })

    it('it auth user', done => {
        chai.request(server)
            .post('/api/public/v1/user/auth')
            .send({
                login: login,
                password: '123456'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.code.should.be.equal(20000);
                res.body.data.should.have.property('name');

                done();
            })
    });

    it('it should return error code, because login or password is incorrect', done => {
        chai.request(server)
            .post('/api/public/v1/user/auth')
            .send({
                login: 'test',
                password: '123456'
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.code.should.be.equal(20002);

                done();
            })
    });
});

describe('Rooms', () => {
    it('it should return invalid token error', done => {
        chai.request(server)
            .get('/api/public/v1/room/list')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.code.should.be.equal(20004);

                done();
            })
    });

    it('it should create a room', done => {
        chai.request(server)
            .put('/api/public/v1/room/create')
            .set('Authorization', token)
            .send({
                name: 'Test room',
                online_list: [user.toString()]
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.code.should.be.equal(20000);

                room_id = res.body.data._id;

                done();
            })
    });

    it('it should add user to room', done => {
        chai.request(server)
            .post('/api/public/v1/room/user/add')
            .set('Authorization', token)
            .send({
                room_id: room_id,
                user_id: user
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.code.should.be.equal(20000);
                res.body.data.nModified.should.be.equal(1);

                done();
            })
    });

    it('it should return rooms list', done => {
        chai.request(server)
            .get('/api/public/v1/room/list')
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.code.should.be.equal(20000);
                res.body.data.should.be.instanceOf(Array);

                done();
            })
    });

    it('it should remove user from room', done => {
        chai.request(server)
            .delete('/api/public/v1/room/user/remove')
            .set('Authorization', token)
            .query({
                room_id: room_id,
                user_id: user
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.code.should.be.equal(20000);
                res.body.data.nModified.should.be.equal(1);

                done();
            })
    })
});

describe('Messages', () => {
   it('should create a message', done => {
       chai.request(server)
           .put('/api/public/v1/message/create')
           .set('Authorization', token)
           .send({
               message: 'Test message',
               chat_id: room_id
           })
           .end((err, res) => {
                res.should.have.status(200);
                res.body.code.should.be.equal(20000);
                res.body.data.should.be.instanceof(Object);

                done();
           })
   });
});

