module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true, // adds createdAt and updatedAt
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Application, { foreignKey: 'userId' });
  };

  return User;
};
