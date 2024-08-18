const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: 'https://66c192eb832d572935f4897d--registerahead.netlify.app',
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
    await mongoose.connect(db);
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

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received. Closing server and MongoDB connection.');

  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('Server and MongoDB connection closed.');
      process.exit(0);
    });
  });
});
