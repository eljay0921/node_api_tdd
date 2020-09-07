const app = require("./index");
const request = require("supertest");

describe("GET /users는 ", () => {
  it("다음 users를 나타낸다.", (done) => {
    request(app)
      .get("/users")
      .end((err, res) => {
        console.log(res.body);

        done(); // 테스트가 끝났음을 알리는 콜백
      });
  });
});
