const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Failed to authenticate token.",
        });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send({
      success: false,
      message: "You are not authenticated!",
    });
  }
}

module.exports = verifyToken;