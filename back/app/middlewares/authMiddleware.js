const jwtService = require("../services/jwtService");

const authMiddleware =
  (isRefresh = false) =>
  async (request, response, next) => {
    try {
      const { authorization } = request.headers;

      if (!authorization) {
        return response.status(401).json({ error: "No token found" });
      }

      const token = authorization.split(" ")[1];

      if (!token) {
        return response.status(401).json({ error: "No token found" });
      }

      const tokenDecoded = await jwtService.validateToken(token, isRefresh);

      if (tokenDecoded == null) {
        return response.status(401).json({ error: "Invalid or expired token" });
      }

      request.user = tokenDecoded;
    } catch (error) {
      response.status(403).json({ error: "You must be authenticated" });
    }
    return next();
  };

module.exports = authMiddleware;
