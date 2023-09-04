"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {

    static associate(models) {
      // define association here

      this.hasMany(models.Groups, {
        sourceKey: "userId",
        foreignKey: "userId",
      });

      this.hasMany(models.Memories, {
        sourceKey: "userId",
        foreignKey: "userId",
      });

      this.hasMany(models.Comments, {
        sourceKey: "userId",
        foreignKey: "userId",
      });

      this.hasMany(models.Participants, {
        sourceKey: "userId",
        foreignKey: "userId",
        onDelete: 'CASCADE'
      });
    }
  }

  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      loginId: {
        type: DataTypes.STRING,
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "닉네임"
      },
      password: {
        type: DataTypes.STRING,
      },
      profileUrl: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "https://res.cloudinary.com/dxl01ypgw/image/upload/v1693664401/TEST/KakaoTalk_20230902_231524661_lm2zxh.png",
      },
      providerType: {
        type: DataTypes.STRING,
      },
      kakaoId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Users",
      timestamps: true,
      paranoid: true,  // 소프트 딜리트 옵션 추가
    }
  );
  return Users;
};
