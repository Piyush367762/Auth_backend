const express = require("express");

const app = express();

const rateLimitStore = new Map();

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();

  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10; // max 10 requests per minute

  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + windowMs
    });

    return next();
  }

  if (record.count >= maxRequests) {
    return res.status(429).json({
      error: "Too many requests. Please try again later."
    });
  }

  record.count++;
  next();
}

app.use(rateLimiter);

app.get("/", (req, res) => {
  res.send("Hello, rate-limited world!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
