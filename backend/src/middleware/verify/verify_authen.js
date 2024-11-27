const { connectDB } = require("../../config/config.js");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { getOne } = require("../../config/query.js");
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
    if (!authCookie) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "You must login first" });
    }
    jwt.verify(authCookie, SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "This session has expired. Please login" });
      }
      const { id } = decoded;

      const user = await getOne("User", { user_ID: id });
      if (!user) {
        console.error(`User with id ${id} not found in database`);
        return res.status(StatusCodes.UNAUTHORIZED).json({message: "User not found" });
      }
      req.user = user;
      next();
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
