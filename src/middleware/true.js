// src/middlewares/basic-auth.middleware.js

function basicAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.set("WWW-Authenticate", 'Basic realm="Protected API"');
    return res.status(401).send("Authentication required");
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");

  const [username, password] = credentials.split(":");

  if (
    username === process.env.ADMIN_BASIC_USER &&
    password === process.env.ADMIN_BASIC_PASSWORD
  ) {
    return next();
  }

  res.set("WWW-Authenticate", 'Basic realm="Protected API"');
  return res.status(401).send("Invalid username or password");
}

module.exports = basicAuthMiddleware;
