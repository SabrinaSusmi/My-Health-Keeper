const request = require("supertest");
const app = require("../app");
const chai = require("chai");
const should = require('should');
const User = require("../controllers/user.controllers/profile.controllers");
var token = ""

// describe("Payment Status", () => {
//     it("Get payment status", (done) => {
//         request(app).get("/user_payment_status").set(User).expect("Payment done", done).expect(200);
//     });
//   });

  describe('GET /getFoodHistory', () => {
    it('respond with a list of all food', (done) =>{
        request(app)
            .get('users/getFoodHistory')
            .set("Date",'Sun, 17 Oct 2021 13:33:57 GMT'+token)
            .expect(200, done).then((res)=>{expect(res.body.message).to.equal("List Not found")})
    });
});


