const request = require("supertest");
const app = require("../app");
const chai = require("chai");
const should = require('should');
const User = require("../controllers/user.controllers/profile.controllers");
var context = describe;





describe('Users', function () {
 
    it('should create a user', function () {

      request(app)
      .post('/user/signup')
      .field('name', 'foogie')
      .field('email', 'foo@gmail.com')
      .field('password', 'Foo1234556')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if(err){
            console.log("error");
            
        }
        else {
            console.log(res);
           
        }
    });
    });
});


describe('GenHealth History api', function () {

  it('GET /history', () => { 
      return request(app)
      .get('/genHealthHistory').expect('Content-Type','application/json; charset=utf-8')
      .expect(200)
  })
})

describe('GET /user', function(req,res) {
  -  it('respond with json', ()=> {
      return request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type','text/html; charset=utf-8')
        .expect(200);
    });
  });

