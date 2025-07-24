'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    static associate(models) {
      // Each Application belongs to one User via userId foreign key
      Application.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Application.init({
    jobTitle: DataTypes.STRING,
    company: DataTypes.STRING,
    jobDesc: DataTypes.TEXT,
    resumeText: DataTypes.TEXT,
    coverLetterText: DataTypes.TEXT,
    status: DataTypes.STRING,
    appliedDate: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Application',
  });

  return Application;
};
