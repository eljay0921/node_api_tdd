const request = require("supertest");
const should = require("should");
const app = require("../../index");
const models = require("../../models");

describe("TEST :: GET USERS", () => {
  const testData = [{ name: "jin" }, { name: "syeon" }, { name: "doongdung" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.Users.bulkCreate(testData));

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
  const testData = [{ name: "jin" }, { name: "syeon" }, { name: "doongdung" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.Users.bulkCreate(testData));

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
  const testData = [{ name: "jin" }, { name: "syeon" }, { name: "doongdung" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.Users.bulkCreate(testData));

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

describe.only("TEST :: POST USERS BY USER INFO", () => {
  const testData = [{ name: "jin" }, { name: "syeon" }, { name: "doongdung" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.Users.bulkCreate(testData));

  const testName = "jake";

  describe("성공하는 케이스", () => {
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

  describe("실패하는 케이스", () => {
    it("name 파라미터가 없으면 HTTP Status 400을 응답한다.", (done) => {
      request(app)
        .post("/users")
        .send({
          myName: "",
        })
        .expect(400)
        .end(done);
    });

    it("name이 중복이면 HTTP Status 409를 응답한다.", (done) => {
      request(app)
        .post("/users")
        .send({
          name: testName,
        })
        .expect(409)
        .end(done);
    });
  });
});

describe("TEST :: PUT USERS BY USER INFO", () => {
  const id = 1;
  const name = "jiiiiin";

  describe("성공하는 케이스", () => {
    it("수정된 유저 정보를 반환한다.", (done) => {
      request(app)
        .put(`/users/${id}`)
        .send({
          name,
        })
        .end((err, res) => {
          res.body.should.have.property("name", name);
          done();
        });
    });
  });

  describe("실패하는 케이스", () => {
    it("id가 숫자형이 아니면 HTTP Status 400을 응답한다.", (done) => {
      request(app).put("/users/one").expect(400).end(done);
    });

    it("name이 없으면 HTTP Status 400을 응답한다.", (done) => {
      request(app).put("/users/1").send({ name: "" }).expect(400).end(done);
    });

    it("존재하지 않는 유저의 id를 전달하면 HTTP Status 404를 응답한다.", (done) => {
      request(app)
        .put("/users/8888")
        .send({ name: "oh-no" })
        .expect(404)
        .end(done);
    });

    it("name이 이미 존재하면 HTTP Status 409를 응답한다.", (done) => {
      request(app)
        .put("/users/3")
        .send({ name: "syeon" })
        .expect(409)
        .end(done);
    });
  });
});
