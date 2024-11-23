const { connectDB } = require("../config/config.js");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { getOne } = require("../database/query");
require("dotenv").config();

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = async (req, res, next) => {
  try {
    const authCookie = req.cookies.SessionID;

    // Kiểm tra xem có cookie SessionID không
    if (!authCookie) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "You must login first" });
    }

    // Giải mã JWT và kiểm tra lỗi
    jwt.verify(authCookie, SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "This session has expired. Please login" });
      }

      const { id } = decoded;
      
      // Lấy thông tin user từ database dựa trên ID
      const user = await getOne("users", { id: id });
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not found" });
      }

      req.user = user;  // Gắn thông tin user vào request
      next();  // Tiếp tục xử lý request
    });
  } catch (err) {
    console.error("Error in authenticateToken:", err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      data: [],
      message: err.message,
    });
  }
};

module.exports = authenticateToken;
