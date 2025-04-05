import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';


// Load .env from root directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('Loaded URI:', process.env.MONGO_URI);



// Debug: Confirm MONGO_URI is being loaded
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI not defined in .env');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Connection error:', err));
