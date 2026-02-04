import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // These options help avoid connection errors on some networks
            family: 4,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        if (error.name === 'MongoParseError' && error.message.includes('SRV')) {
            console.error('\n!!! DNS ERROR DETECTED !!!');
            console.error('This is a network issue. Your network is blocking the "mongodb+srv" connection.');
            console.error('SOLUTION: Please get the "Standard Connection String" (starts with mongodb://) from Atlas and update your .env file.\n');
        }
        process.exit(1);
    }
};

export default connectDB;