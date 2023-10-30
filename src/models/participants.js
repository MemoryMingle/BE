"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Participants extends Model {

    static associate(models) {

      this.belongsTo(models.Groups, {
        targetKey: "groupId",
        foreignKey: "groupId",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Users, {
        foreignKey: "userId",
        targetKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  Participants.init(
    {
      participantid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Groups",
          key: "groupId",
        },
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "userId",
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      modelName: "Participants",
    }
  );
  return Participants;
};
