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

    it("최대 limit 개수만큼 응답한다.", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("실패 시", () => {
    it("limit이 숫자형이 아니면 HTTP Status 400을 응답한다.", (done) => {
      request(app)
        .get("/users?limit=two")
        .expect(400) // should를 사용하지 않고, supertest에서 지원하는 expect를 통해 검증
        .end(done);
    });
  });
});
