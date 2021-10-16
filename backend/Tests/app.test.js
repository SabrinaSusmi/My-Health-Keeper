const request = require("supertest");
const app = require("../app");

describe("test1", () => {
  it("server is connected", (done) => {
    request(app).get("/").expect("App running", done);
  });
});
