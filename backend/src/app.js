const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || '*', // Allows requests from specified origin
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Load user routes (adjust path to reflect the structure)
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Database connection string from environment variables
const db = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};


mongoose.connection.once('connected', () => {
  console.log(`Connected to MongoDB at ${db}`);
});

const PORT = process.env.PORT || 5000;


connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const gracefulShutdown = () => {
  console.info('Shutdown signal received. Closing server and MongoDB connection.');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('Server and MongoDB connection closed.');
      process.exit(0);
    });
  });
};


process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
