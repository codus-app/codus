const { UnauthorizedError } = require('express-jwt');

module.exports = (err, req, res, next) => {
  if (err instanceof UnauthorizedError) res.status(err.status).json({ error: err.message });
  else next();
};
