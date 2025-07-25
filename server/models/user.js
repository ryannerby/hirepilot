import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: { isEmail: true },
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'User',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    User.hasMany(models.Application, { foreignKey: 'userId' });
  }
}

export default User;
