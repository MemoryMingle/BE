"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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

      this.hasMany(models.Participant, {
        sourceKey: "userId",
        foreignKey: "userId",
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
        defaultValue: "https://t1.daumcdn.net/cfile/tistory/243FE450575F82662D",
      },
      providerType: {
        type: DataTypes.STRING,
      },
      kakaoId: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
