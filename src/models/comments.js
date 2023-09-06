"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {

    static associate(models) {

      this.belongsTo(models.Memories, {
        foreignKey: "memoryId",
        targetKey: "memoryId",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Users, {
        foreignKey: "userId",
        targetKey: "userId",
      });
    }
  }
  Comments.init(
    {
      commentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      memoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Memories",
          key: "memoryId",
        },
      },
      comment: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "userId",
        },
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
      modelName: "Comments",
    }
  );
  return Comments;
};
