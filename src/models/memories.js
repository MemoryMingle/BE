"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Memories extends Model {
    static associate(models) {

      this.belongsTo(models.Users, {
        targetKey: "userId",
        foreignKey: "userId",
      });

      this.belongsTo(models.Groups, {
        targetKey: "groupId",
        foreignKey: "groupId",
      });

      this.hasMany(models.Comments, {
        sourceKey: "memoryId",
        foreignKey: "memoryId",
        onDelete: "CASCADE",
      });
    }
  }
  Memories.init(
    {
      memoryId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      imageUrl: {
        allowNull: false,
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
      modelName: "Memories",
    }
  );
  return Memories;
};
