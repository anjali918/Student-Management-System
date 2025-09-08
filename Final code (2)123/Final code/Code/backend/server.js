const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
const path = require('path');
app.use(express.static(path.join(__dirname, '..', '')));

// Database connection
const db = require('./database');

// Make db available globally for routes
global.db = db;

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/students', require('./routes/students'));
app.use('/api/courses', require('./routes/courses'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EduManage Backend is running' });
});

// Fallback to serve index.html for SPA routing (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
async function startServer() {
  try {
    await db.connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
