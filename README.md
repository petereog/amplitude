# Amplitude Backend API

A robust Express.js backend with production-ready features.

## Features

✅ **Express.js** - Fast, unopinionated web framework
✅ **Security** - Helmet.js for HTTP headers protection
✅ **Validation** - Input validation with Joi schemas
✅ **Error Handling** - Centralized error handling middleware
✅ **Logging** - Morgan request logging
✅ **CORS** - Cross-Origin Resource Sharing support
✅ **Compression** - Response compression with gzip
✅ **Async Errors** - Express async error handling
✅ **Environment Config** - dotenv support
✅ **Graceful Shutdown** - Proper signal handling

## Project Structure

```
amplitude/
├── src/
│   ├── config/              # Configuration files
│   ├── controllers/         # Business logic
│   ├── middleware/          # Custom middleware
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   └── validators/          # Joi validation schemas
├── index.js                 # Application entry point
├── package.json             # Dependencies
├── .env                     # Environment variables
└── README.md               # This file
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (already created with defaults):
```
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
```

## Running the Application

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

## API Endpoints

### Health Check
```bash
GET /api/health
```
Returns server status.

### Submit Data
```bash
POST /api/data
Content-Type: application/json

{
  "data": "example data",
  "userId": "user123",
  "timestamp": "2026-02-18T10:30:00Z"
}
```

### Get Data
```bash
GET /api/data
```

## Key Features Explained

### Security (Helmet.js)
- Prevents common web vulnerabilities
- Sets secure HTTP headers
- CORS protection

### Validation (Joi)
- Request body validation
- Automatic stripping of unknown fields
- Detailed error messages

### Error Handling
- Centralized error handler
- Proper HTTP status codes
- Environment-aware error messages
- Request context logging

### Logging (Morgan)
- Request/response logging
- Response time tracking
- Skips logging for health checks

### Graceful Shutdown
- Handles SIGTERM and SIGINT signals
- Closes HTTP server properly
- Handles uncaught exceptions
- Handles unhandled promise rejections

## Development Workflow

1. Add new routes in `src/routes/api.js`
2. Create controllers in `src/controllers/` for business logic
3. Add validation schemas in `src/utils/validators.js`
4. Use validation middleware: `validate(schemas.yourSchema)`
5. Error handling is automatic - just use `next(error)`

## Adding New Endpoints

Example:
```javascript
// 1. Add validator in src/utils/validators.js
const schemas = {
  createUser: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};

// 2. Create controller in src/controllers/userController.js
const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.validatedData;
    // Your logic here
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

// 3. Add route in src/routes/api.js
router.post('/users', validate(schemas.createUser), userController.createUser);
```

## Environment Variables

- `NODE_ENV` - Application environment (development/production)
- `PORT` - Server port (default: 3000)
- `LOG_LEVEL` - Logging level (debug/info/warn/error)

## Testing

Run tests:
```bash
npm test
```

Run with linting:
```bash
npm run lint
```

## Dependencies

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **helmet** - HTTP headers security
- **morgan** - HTTP request logging
- **joi** - Schema validation
- **dotenv** - Environment variables
- **compression** - Response compression
- **express-async-errors** - Async error handling

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Set proper PORT
- [ ] Configure environment variables
- [ ] Enable HTTPS
- [ ] Set up monitoring/logging
- [ ] Configure database connections
- [ ] Add rate limiting
- [ ] Add authentication/authorization
- [ ] Run security audit: `npm audit`
- [ ] Set up CI/CD pipeline

## License

ISC
