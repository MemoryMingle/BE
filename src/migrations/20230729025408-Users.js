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
        defaultValue: "https://res.cloudinary.com/dxl01ypgw/image/upload/v1693664401/TEST/KakaoTalk_20230902_231524661_lm2zxh.png",
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
