"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      loginId: {
        type: Sequelize.STRING,
        unique: true
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "닉네임",
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      profileUrl: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "https://t1.daumcdn.net/cfile/tistory/243FE450575F82662D",
      },
      providerType: {
        type: Sequelize.STRING,
      },
      kakaoId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
