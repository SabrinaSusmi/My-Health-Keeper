const request = require("supertest");
const app = require("../app");
const chai = require("chai");
const User = require("../controllers/user.controllers/profile.controllers");


describe("Payment Status", () => {
    it("Get payment status", (done) => {
        request(app).get("/user_payment_status").set(User).expect("Payment done", done).expect(200);
    });
  });
