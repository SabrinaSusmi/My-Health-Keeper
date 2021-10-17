
const request = require("supertest");
const app = require("../app");
const chai = require("chai");
const express = require('express');
const should = require('should');
var expect = chai.expect



describe("Jest Status", () => {
  it('Testing to see if Jest works', () => {
      expect(1).to.equal(1)
    })
  
  });
describe("App Test", () => {
    it("server is connected", (done) => {
      request(app).get("/").expect("App running", done).expect(200);
    });
  });

  

  describe("Redirect Test", () => {
  it('should handle redirects', function (done) {
    const app = express();

    app.get('/login', function (req, res) {
      res.end('Login');
    });

    app.get('/', function (req, res) {
      res.redirect('/login');
    });

    request(app)
      .get('/')
      .redirects(1)
      .end(function (err, res) {
        should.exist(res);
        res.status.should.be.equal(200);
        res.text.should.be.equal('Login');
        done();
      });
  });
});