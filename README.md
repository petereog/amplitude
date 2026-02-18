# Amplitude - Full Stack Express Application

A **production-ready Express.js backend** with an **interactive HTML/CSS/JavaScript frontend dashboard**.

## 🌟 Features

### Backend
✅ **Express.js** - Fast, unopinionated web framework
✅ **Security** - Helmet.js for HTTP headers protection  
✅ **Rate Limiting** - Built-in request rate limiting (100 req/15min)
✅ **Validation** - Input validation with Joi schemas
✅ **Error Handling** - Centralized error handling middleware
✅ **Logging** - Morgan request logging
✅ **CORS** - Cross-Origin Resource Sharing support
✅ **Compression** - Response compression with gzip
✅ **Async Errors** - Express async error handling
✅ **Environment Config** - dotenv support
✅ **Graceful Shutdown** - Proper signal handling
✅ **Request Tracking** - Performance metrics and statistics
✅ **In-Memory Database** - UUID-based data storage with CRUD operations

### Frontend
✅ **Interactive Dashboard** - Real-time data management UI
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Health Monitoring** - Server status and uptime tracking
✅ **Data Management** - Submit, view, and delete data entries
✅ **Statistics Dashboard** - Real-time API metrics
✅ **Beautiful UI** - Modern gradient design with smooth animations
✅ **Error Handling** - User-friendly error messages
✅ **Auto-refresh** - Periodic status checks

## 📁 Project Structure

```
amplitude/
├── src/
│   ├── config/              # Configuration files
│   ├── controllers/         # Business logic
│   ├── middleware/          # Custom middleware (error, validation, rate limiting, logging)
│   ├── routes/              # API routes
│   ├── utils/               # Database, request tracking, validators
│   └── validators/          # Joi validation schemas
├── public/
│   └── index.html           # Frontend dashboard
├── index.js                 # Application entry point
├── package.json             # Dependencies
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── README.md               # This file
├── API.md                  # API documentation
└── package-lock.json       # Locked dependencies
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

## 🛡️ Security Features

- **Helmet.js** - Protects against common web vulnerabilities
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Input Validation** - Joi schema validation for all inputs
- **Error Masking** - Sensitive errors hidden in production
- **CORS Protection** - Cross-origin requests properly handled
- **Secure Headers** - Content Security Policy, X-Frame-Options, etc.

## 🔄 Middleware Stack

1. **Helmet** - Security headers
2. **CORS** - Cross-origin resource sharing
3. **Express.json** - JSON body parser (10MB limit)
4. **Compression** - Response compression
5. **Morgan** - HTTP request logging
6. **Request Tracker** - Performance metrics
7. **Rate Limiter** - Request throttling
8. **Static Files** - Serve public directory
9. **Error Handler** - Centralized error handling

## 📦 Dependencies

### Production
- **express** (^4.18.2) - Web framework
- **cors** (^2.8.5) - Cross-origin support
- **helmet** (^7.1.0) - Security headers
- **morgan** (^1.10.0) - HTTP logging
- **joi** (^17.11.0) - Schema validation
- *🔧 Development Workflow

### Adding New Endpoints

1. **Create validation schema** in `src/utils/validators.js`:
```javascript
const schemas = {
  createUser: Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().email().required(),
  }),
};
```

2. **Create controller** in `src/controllers/userController.js`:
```javascript
const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.validatedData;
    // Your business logic here
    res.status(201).json({ success: true, data: { name, email } });
  } catch (error) {
    next(error);
  }
};
```

3. **Add route** in `src/routes/api.js`:
```javascript
router.post('/users', validate(schemas.createUser), userController.createUser);
```

### Error Handling Best Practices

All errors are automatically caught and handled:
```javascript
// Errors are automatically caught by express-async-errors
const getData = async (req, res, next) => {
  const data = await someAsyncOperation(); // Errors propagate to error handler
  res.json(data);
};

// Or manually pass errors
const getData = async (req, res, next) => {
  try {
    // code
  } catch (error) {
    next(error); // Passed to error handler
  }
};
```

### Adding Custom Middleware

Create middleware in `src/middleware/`:
```javascript
const authMiddleware = (req, res, next) => {
  // Your logic
  next();
};

// Use it in routes:
router.post('/protected', authMiddleware, controllerFunction);
``` ] Configure environment variables
- [ ] Enable HTTPS
- [ ] Set up monitoring/logging
- [ ] Configure database connections
- [ ] Add rate limiting
- [ ] Add authentication/authorization
- [ ] Run security audit: `npm audit`
- [ ] Set up CI/CD pipeline

## License

ISC
⚙️ Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | Application environment |
| `PORT` | 3000 | Server port |
| `LOG_LEVEL` | debug | Logging level (debug/info/warn/error) |

## 📈 Database

The application uses an **in-memory database** with the following structure:

```javascript
{
  id: "uuid-v4-string",
  data: "user data",
  userId: "optional-user-id",
  timestamp: "ISO-8601-date",
  status: "processed"
}
```

Features:
- UUID v4 unique identifiers
- Automatic timestamps
- User tracking support
- Full CRUD operations
- Statistics tracking

## 🧪 Testing

Run tests:
```bash
npm test
```

Run with linting:
```bash
npm run lint
```

## 🚀 Production Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure `PORT` environment variable
- [ ] Set up proper logging
- [ ] Enable HTTPS/TLS
- [ ] Configure database (MongoDB, PostgreSQL, etc.)
- [ ] Add authentication/authorization
- [ ] Set up monitoring and alerts
- [ ] Configure backups
- [ ] Run security audit: `npm audit`
- [ ] Set up CI/CD pipeline
- [ ] Configure rate limiting for production
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Enable CORS for specific origins only in production
- [ ] Use environment-specific configurations

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Helmet.js Documentation](https://helmetjs.github.io/)
- [Joi Validation Documentation](https://joi.dev/api/)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## 📝 License

ISC

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Happy Coding! 🎉**