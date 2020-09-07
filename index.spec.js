const request = require("supertest");
const should = require("should");
const app = require("./index");

describe("GET /users는 ", () => {
  describe("성공 시, ", () => {
    it("user 객체를 담은 배열로 응답한다.", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done(); // 테스트가 끝났음을 알리는 콜백 => 비동기로 동작하기 때문에 필요
        });
    });
  });
});
