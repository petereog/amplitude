# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Currently, the API does not require authentication. Rate limiting is applied based on IP address.

## Rate Limiting
- General endpoints: 100 requests per 15 minutes
- Health checks are exempt from rate limiting

## Endpoints

### Health Check
Check if the server is running and get uptime information.

```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-02-18T10:30:00.000Z",
  "uptime": 125.45
}
```

### Submit Data
Submit new data to the system.

```http
POST /api/data
Content-Type: application/json

{
  "data": "your data here",
  "userId": "optional-user-id"
}
```

**Parameters:**
- `data` (string, required): The data to submit (1-1000 characters)
- `userId` (string, optional): User identifier
- `timestamp` (date, optional): Custom timestamp

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Data received and processed successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "data": "your data here",
    "userId": "optional-user-id",
    "timestamp": "2026-02-18T10:30:00.000Z",
    "status": "processed"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Validation Failed",
  "details": [
    {
      "field": "data",
      "message": "\"data\" is required"
    }
  ]
}
```

### Get All Data
Retrieve all submitted data entries with pagination.

```http
GET /api/data?limit=50&offset=0
```

**Query Parameters:**
- `limit` (number, default: 50, max: 100): Number of entries to return
- `offset` (number, default: 0): Number of entries to skip

**Response (200 OK):**
```json
{
  "success": true,
  "total": 42,
  "limit": 50,
  "offset": 0,
  "entries": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "data": "your data here",
      "userId": "user123",
      "timestamp": "2026-02-18T10:30:00.000Z",
      "status": "processed"
    }
  ]
}
```

### Get Data by ID
Retrieve a specific data entry by its ID.

```http
GET /api/data/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "data": "your data here",
    "userId": "user123",
    "timestamp": "2026-02-18T10:30:00.000Z",
    "status": "processed"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Entry with ID xxx not found"
}
```

### Delete Data
Delete a specific data entry.

```http
DELETE /api/data/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Entry deleted successfully",
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Entry with ID xxx not found"
}
```

### Get Statistics
Retrieve API statistics and database information.

```http
GET /api/stats
```

**Response (200 OK):**
```json
{
  "success": true,
  "database": {
    "totalEntries": 42,
    "totalRequests": 125,
    "createdAt": "2026-02-18T10:00:00.000Z"
  },
  "metrics": {
    "totalRequests": 125,
    "requestsPerMinute": 5,
    "averageDuration": "45.23",
    "statusCodes": {
      "200": 50,
      "201": 35,
      "400": 5,
      "404": 3,
      "500": 2
    },
    "timestamp": "2026-02-18T10:30:00.000Z"
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or validation error |
| 404 | Not Found - Resource does not exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Example Requests

### Using cURL

**Submit data:**
```bash
curl -X POST http://localhost:3000/api/data \
  -H "Content-Type: application/json" \
  -d '{
    "data": "Hello World",
    "userId": "user123"
  }'
```

**Get all data:**
```bash
curl http://localhost:3000/api/data?limit=10
```

**Delete data:**
```bash
curl -X DELETE http://localhost:3000/api/data/550e8400-e29b-41d4-a716-446655440000
```

### Using JavaScript/Fetch

**Submit data:**
```javascript
const response = await fetch('http://localhost:3000/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: 'Hello World',
    userId: 'user123'
  })
});
const data = await response.json();
console.log(data);
```

**Get data:**
```javascript
const response = await fetch('http://localhost:3000/api/data?limit=10');
const data = await response.json();
console.log(data.entries);
```

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Data is stored in memory and will be lost when the server restarts
- The API uses UUID v4 for entry IDs
- CORS is enabled for all origins
- All responses are compressed using gzip
