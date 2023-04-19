import Sequelize from 'sequelize';
import colors from '../../utils/colors.js';

const connectPostgreSQL = async () => {
  try {
    const sequelize = new Sequelize(process.env.POSTGRESQL_URI, {
      dialect: 'postgres',
      logging: false,
    });

    await sequelize.authenticate();
    console.log(`${colors.blue}Connected to PostgreSQL`);
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1);
  }
};

export default connectPostgreSQL;