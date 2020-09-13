const { Sequelize, DataTypes } = require("sequelize");

// 시퀄라이즈 객체 생성
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
});

// 시퀄라이즈 Users 모델 정의
const Users = sequelize.define("Users", {
  // id는 자동으로 생성해준다.
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = { Sequelize, sequelize, Users };
