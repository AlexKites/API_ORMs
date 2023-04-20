// connection.js
import Sequelize from 'sequelize';
import colors from '../../utils/colors.js';
import { POSTGRESQL_URI } from '../../dotenv.config.js';

const sequelize = new Sequelize(POSTGRESQL_URI, {
  dialect: 'postgres',
  logging: false,
});

const createTables = async () => {
  try {
    await sequelize.sync({ force: false }); // Cambia a `true` para recrear las tablas si ya existen
    console.log(`${colors.blue}Tables successfully created or updated`);
  } catch (error) {
    console.error('Error al crear o actualizar las tablas:', error);
    process.exit(1);
  }
};


const connectPostgreSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log(`${colors.blue}Connected to PostgreSQL`);
    await createTables();
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1);
  }
};

export { sequelize, connectPostgreSQL };
