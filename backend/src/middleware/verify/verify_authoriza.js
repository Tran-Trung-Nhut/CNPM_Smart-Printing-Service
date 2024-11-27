const { StatusCodes } = require("http-status-codes");

const authorizeRole = (roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).json("You must login first.");
    }
    if (!roles.includes(user.role)) {
      return res.status(StatusCodes.FORBIDDEN).json("You don't have permission to do this action.");
    }
    next();
  };
};

module.exports = authorizeRole;
