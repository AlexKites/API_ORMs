// config.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const { POSTGRESQL_URI, MONGODB_URI, PORT } = process.env;

export { POSTGRESQL_URI, MONGODB_URI, PORT };
