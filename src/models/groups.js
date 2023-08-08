"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Users, {
        foreignKey: "userId",
        targetKey: "userId",
      });

      this.hasMany(models.Memories, {
        sourceKey: "groupId",
        foreignKey: "groupId",
      });

      this.hasMany(models.Participants, {
        sourceKey: "groupId",
        foreignKey: "groupId",
      });
    }
  }
  Groups.init(
    {
      groupId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      groupName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      thumbnailUrl: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "https://t1.daumcdn.net/cfile/tistory/243FE450575F82662D",
      },
      place: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
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
      modelName: "Groups",
    }
  );
  return Groups;
};
