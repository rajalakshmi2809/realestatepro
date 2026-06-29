import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Initialize the express app
const app = express();

// Global Middleware
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Secure HTTP headers
app.use(morgan('dev')); // HTTP request logger

// Default Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Premium Estates API'
  });
});

// We will plug in routers here in subsequent phases
// Example: app.use('/api/auth', authRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
    errors: err.errors || []
  });
});

export default app;
