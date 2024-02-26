const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (request, response, next) => {
  let token;

  let authHeader = request.headers.Authorization || request.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.MY_SECRET_TOKEN, (error, decoded) => {
      if (error) {
        response.status(401);
        throw new Error("User is not Authorized!");
      } else {
        request.user = decoded.user;
        next();
      }
    });

    if (!token) {
        response.status(401);
        response.send("User is not Authorized!")
    }
  }
});

module.exports = validateToken;
