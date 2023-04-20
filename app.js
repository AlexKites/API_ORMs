import express from 'express';
import morgan from 'morgan';

import colors from './utils/colors.js';
import connectToMongoDB from './mongo/models/connection.js';
import { connectPostgreSQL } from './sequelize/models/connection.js';
import { PORT } from './dotenv.config.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const connectDatabases = async () => {
    try {
        await connectToMongoDB();
        await connectPostgreSQL();
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};

app.get('/', (req, res) => {
    res.send('Bienvenidos a la API-ejemplo de MongoDB y PostgreSQL!');
});

app.listen(PORT, async () => {
    await connectDatabases();
    console.log(`${colors.white}Example app listening at port ${PORT}`);
});
