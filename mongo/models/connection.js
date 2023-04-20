import mongoose from "mongoose";
import colors from "../../utils/colors.js";

import { MONGODB_URI } from "../../dotenv.config.js";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`${colors.green}Connected to MongoDB`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectToMongoDB;