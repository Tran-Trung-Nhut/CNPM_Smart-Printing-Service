import React, { createContext } from "react";

// Định nghĩa kiểu User
interface User {
  isSPSO: boolean;
  isStudent: boolean;
}

// Định nghĩa kiểu cho UserContext
interface UserContextType {
  user: User | null; // user có thể là null nếu chưa có người dùng
}

// Khởi tạo giá trị mặc định cho context
const defaultValue: UserContextType = {
  user: null, // Bạn có thể thay đổi thành một đối tượng mặc định nếu cần
};

// Tạo context với giá trị mặc định
export const UserContext = createContext<UserContextType>(defaultValue);
