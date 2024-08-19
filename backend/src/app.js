const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://66c192eb832d572935f4897d--registerahead.netlify.app' // Production
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

const db = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
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

connectDB();

const PORT = process.env.PORT || 5000;

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
