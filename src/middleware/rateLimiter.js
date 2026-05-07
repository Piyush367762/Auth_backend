const requestStore = new Map();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;

function rateLimiter(req, res, next) {
  const key = req.ip;
  const now = Date.now();
  const record = requestStore.get(key);

  if (!record || now > record.resetTime) {
    requestStore.set(key, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });

    return next();
  }

  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);

    res.set("Retry-After", String(retryAfter));
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
    });
  }

  record.count += 1;
  next();
}

module.exports = rateLimiter;
