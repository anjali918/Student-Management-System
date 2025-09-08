const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  try {
    // Use local MongoDB as fallback if Atlas connection fails
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edumanage';

    await mongoose.connect(mongoURI, {
      // Remove deprecated options
    });

    console.log('Connected to MongoDB database');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Please ensure MongoDB is running locally or provide a valid MONGODB_URI in .env file');
    // Don't exit process, let the app continue with limited functionality
    // process.exit(1);
  }
}

module.exports = {
  connectDB
};
