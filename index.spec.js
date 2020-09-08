const request = require("supertest");
const should = require("should");
const app = require("./index");

describe("TEST :: GET USERS", () => {
  describe("성공하는 케이스, ", () => {
    it("user 객체를 담은 배열로 응답한다.", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done(); // 테스트가 끝났음을 알리는 콜백 => 비동기로 동작하기 때문에 필요
        });
    });

    it("limit 개수만큼 응답한다.", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("실패하는 케이스", () => {
    it("limit이 숫자형이 아니면 HTTP Status 400을 응답한다.", (done) => {
      request(app)
        .get("/users?limit=two")
        .expect(400) // should를 사용하지 않고, supertest에서 지원하는 expect를 통해 검증
        .end(done);
    });
  });
});

describe("TEST :: GET USERS BY ID", () => {
  describe("성공하는 케이스,", () => {
    it("id가 1인 유저 객체를 반환한다.", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });

  describe("실패하는 케이스,", () => {
    it("id가 숫자형이 아니면 HTTP Status 400을 응답한다.", (done) => {
      request(app).get("/users/one").expect(400).end(done);
    });

    it("id로 유저를 찾을 수 없으면 404를 응답한다.", (done) => {
      request(app).get("/users/9999").expect(404).end(done);
    });
  });
});

describe("TEST :: DELETE USERS BY ID", () => {
  describe("성공하는 케이스", () => {
    it("id가 1인 사용자를 삭제하고, HTTP Status 204를 응답한다.", (done) => {
      request(app).delete("/users/1").expect(204).end(done);
    });
  });

  describe("실패하는 케이스", () => {
    it("id가 숫자형이 아니면 HTTP Status 400을 응답한다.", (done) => {
      request(app).delete("/users/one").expect(400).end(done);
    });
  });
});

describe("TEST :: POST USERS BY USER INFO", () => {
  describe("성공하는 케이스", () => {
    const testName = "jake";
    let body = "";
    before((done) => {
      request(app)
        .post("/users")
        .send({
          name: testName,
        })
        .expect(201)
        .end((_, res) => {
          body = res.body;
          done();
        });
    });

    it("추가된 유저의 정보를 반환한다.", (done) => {
      body.should.have.property("name", testName);
      done();
    });
  });
});
