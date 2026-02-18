require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const config = require('./src/config');
const requestLogger = require('./src/middleware/requestLogger');
const errorHandler = require('./src/middleware/errorHandler');
const apiRoutes = require('./src/routes/api');

const app = express();

// ===== Security Middleware =====
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable CORS

// ===== Body Parser Middleware =====
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ===== Compression Middleware =====
app.use(compression()); // Compress responses

// ===== Logging Middleware =====
app.use(requestLogger);

// ===== Routes =====
app.get('/', (req, res) => {
  res.json({
    name: 'Amplitude API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date(),
  });
});

app.use('/api', apiRoutes);

// ===== 404 Handler =====
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`,
    path: req.path,
  });
});

// ===== Error Handling Middleware =====
app.use(errorHandler);

// ===== Server Startup =====
const server = app.listen(config.port, () => {
  console.log(`
    ========================================
    🚀 Server started successfully
    Environment: ${config.env}
    Port: ${config.port}
    ========================================
  `);
});

// ===== Graceful Shutdown =====
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});