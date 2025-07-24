import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import configFile from '../config/config.js';

import User from './user.js';
import Application from './application.js';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Initialize models
User.initModel(sequelize);
Application.initModel(sequelize);

// Setup associations
User.associate({ Application });
Application.associate({ User });

const db = {
  sequelize,
  Sequelize,
  User,
  Application,
};

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    // Uncomment if you want to sync DB schema
    // await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default db;
