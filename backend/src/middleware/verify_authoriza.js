const { StatusCodes } = require("http-status-codes");

const authorizeRole = (roles) => {
  return (req, res, next) => {
    const user = req.user;

    // Kiểm tra xem người dùng đã được xác thực chưa
    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).json("You must login first.");
    }

    // Kiểm tra xem vai trò người dùng có hợp lệ hay không
    if (!roles.includes(user.role)) {
      return res.status(StatusCodes.FORBIDDEN).json("You don't have permission to do this action.");
    }

    next();  // Cho phép tiếp tục vào route nếu quyền hợp lệ
  };
};

module.exports = authorizeRole;
