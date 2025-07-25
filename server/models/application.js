import { Model, DataTypes } from 'sequelize';

class Application extends Model {
  static initModel(sequelize) {
    Application.init(
      {
        jobTitle: DataTypes.STRING,
        company: DataTypes.STRING,
        jobDesc: DataTypes.TEXT,
        resumeText: DataTypes.TEXT,
        coverLetterText: DataTypes.TEXT,
        status: DataTypes.STRING,
        appliedDate: DataTypes.DATE,
        userId: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Application',
      }
    );
  }

  static associate(models) {
    Application.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

export default Application;
