"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    static associate(models) {

      this.belongsTo(models.Users, {
        foreignKey: "userId",
        targetKey: "userId",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Groups, {
        foreignKey: "groupId",
        targetKey: "groupId",
        onDelete: "CASCADE",
      });
    }
  }
  Notifications.init(
    {
      notificationId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "userId",
        },
      },
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Groups",
          key: "groupId",
        },
      },
      thumbnailUrl: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unChecked'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "Notifications",
    }
  );
  return Notifications;
};
