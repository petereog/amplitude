/**
 * Request tracking and metrics middleware
 * Tracks API performance and request patterns
 */
class RequestTracker {
  constructor() {
    this.requests = [];
    this.maxSize = 1000; // Keep last 1000 requests
  }

  track(req, res, duration) {
    const request = {
      timestamp: new Date(),
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
      size: res.get('content-length') || 0,
      ip: req.ip,
    };

    this.requests.push(request);

    // Keep only latest requests
    if (this.requests.length > this.maxSize) {
      this.requests.shift();
    }
  }

  getMetrics() {
    const now = new Date();
    const oneMinuteAgo = new Date(now - 60 * 1000);
    
    const recentRequests = this.requests.filter(r => r.timestamp > oneMinuteAgo);
    const avgDuration = recentRequests.length > 0
      ? recentRequests.reduce((acc, r) => acc + r.duration, 0) / recentRequests.length
      : 0;

    const statusCodes = {};
    this.requests.forEach(r => {
      statusCodes[r.statusCode] = (statusCodes[r.statusCode] || 0) + 1;
    });

    return {
      totalRequests: this.requests.length,
      requestsPerMinute: recentRequests.length,
      averageDuration: avgDuration.toFixed(2),
      statusCodes,
      timestamp: now,
    };
  }
}

const tracker = new RequestTracker();

module.exports = tracker;
