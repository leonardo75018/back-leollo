'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      project.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId"
      }),
        project.hasMany(models.Task, {
          as: "taskt",
          foreignKey: "projectId"
        })
    }
  };
  project.init({
    name: DataTypes.STRING,
    backdrop: DataTypes.STRING,
    userId: DataTypes.INTEGER
  },

    {
      sequelize,
      modelName: 'project',
    });
  return project;
};