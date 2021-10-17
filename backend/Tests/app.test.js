const request = require("supertest");
const app = require("../app");
const chai = require("chai");
var expect = chai.expect


describe("Jest Status", () => {
  it('Testing to see if Jest works', () => {
      expect(1).toBe(1)
    })
  
  });
describe("App Test", () => {
    it("server is connected", (done) => {
      request(app).get("/").expect("App running", done).expect(200);
    });
  });


