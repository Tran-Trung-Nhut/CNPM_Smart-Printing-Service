module.exports = {
  extends: [
    "react-app",               // Cấu hình mặc định của Create React App
    "plugin:prettier/recommended"  // Kết hợp với Prettier
  ],
  rules: {
    "prettier/prettier": "error"  // Hiển thị lỗi nếu Prettier bị vi phạm
  }
};
