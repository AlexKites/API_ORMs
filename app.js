import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();
const port = process.env.PORT;

import colors from './utils/colors.js';
import express from 'express';
const app = express();

import connectPostgreSQL from './sequelize/models/index.js';
import connectMongoDB from './mongo/models/index.js';

const connectDatabases = async () => {
    try {
        await connectMongoDB();
        await connectPostgreSQL();
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, async () => {
    await connectDatabases();
    console.log(`${colors.white}Example app listening at port ${port}`);
});
