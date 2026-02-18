const morgan = require('morgan');

const customFormat = ':method :url :status :response-time ms - :res[content-length]';

const logger = morgan(customFormat, {
  skip: (req, res) => {
    // Skip logging health check requests
    return req.path === '/health';
  },
});

module.exports = logger;
