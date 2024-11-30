import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../state';
import axios from 'axios';
import { PrintConfigurationDto } from '../dtos/PrintConfiguration.dto';
import { UserDto } from '../dtos/User.dto';

export default function UserProfile({ onClose }: { onClose: () => void }) {
  const user = useRecoilValue(userState);
  const [userData, setUserData] = useState<UserDto | null>(null);
  const [userPrintConfig, setUserPrintConfig] = useState<PrintConfigurationDto[]>([])

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/users/${user.user_ID}`);
      setUserData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPrintConfig = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/printconfig?user_ID=${user.user_ID}`);
      setUserPrintConfig(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserData();
    fetchUserPrintConfig() 
  }, []);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-10 rounded-xl shadow-2xl w-[500px] max-w-lg transform transition-all duration-300 scale-95 hover:scale-100 border-4 border-blue-600"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Thông tin cá nhân
        </h3>

        {/* Thông tin người dùng */}
        <div className="text-lg text-gray-800 mb-8 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Tên:</span>
            <span>{userData?.name || 'Chưa có tên'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Email:</span>
            <span>{userData?.email || 'Chưa có email'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">{user.role === 'student' ? 'MSSV' : 'MSCB'}</span>
            <span>{userData?.user_ID || 'Không xác định'}</span>
          </div>

          {user.role === 'student' && (
            <>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Số trang giấy còn lại:</span>
                <span>{userData?.pageBalance}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Tổng số lần in:</span>
                <span>{userPrintConfig.length || '0'}</span>
              </div>
            </>
          )}
        </div>

        {/* Các nút điều khiển */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg transition duration-300 transform hover:bg-gray-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Đóng
          </button>

          {/* <button
            onClick={() => {}}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Chỉnh sửa
          </button> */}
        </div>
      </div>
    </div>
  );
}
