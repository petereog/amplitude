require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const path = require('path');

const config = require('./src/config');
const requestLogger = require('./src/middleware/requestLogger');
const errorHandler = require('./src/middleware/errorHandler');
const { apiLimiter } = require('./src/middleware/rateLimiter');
const tracker = require('./src/utils/requestTracker');
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

// ===== Request Tracking Middleware =====
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    tracker.track(req, res, duration);
  });
  next();
});

// ===== Serve Static Files =====
app.use(express.static(path.join(__dirname, 'public')));

// ===== Root Route =====
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== API Rate Limiting =====
app.use('/api', apiLimiter);

// ===== API Routes =====
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
    Dashboard: http://localhost:${config.port}
    API Docs: http://localhost:${config.port}/api/health
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

module.exports = app;