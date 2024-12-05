import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

export default function EditFileTypePopup({ onClose }: { onClose: () => void }) {
  const [types, setTypes] = useState<string[]>([]);
  const [newType, setNewType] = useState<string>("");
  const user = useRecoilValue(userState);

    const handleDelete = async (tp: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/filetypes/${tp}`)

            fetchFileType()
            alert("Xóa thành công!")
        } catch (error) {
            alert("không thể xóa loại tệp ngay lúc này! Vui lòng thử lại!")
        }
    }

  const handleAdd = async () => {
    if (newType === "") {
      alert("Tên loại tệp không được để trống!");
      return;
    }
    if (types.includes(newType)) {
      alert("Loại tệp này đã tồn tại!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/v1/filetypes", {
        type: newType,
        spso_ID: user.user_ID,
      });
      setTypes([...types, newType]);
      setNewType("");
      alert("Thêm thành công!")
    } catch (error) {
      alert("Không thể thêm loại tệp mới vào lúc này! Vui lòng thử lại sau!");
    }
  };

  const fetchFileType = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/filetypes");
      const typesArray = response.data.data.map(
        (fileType: { type: string }) => fileType.type
      );
      setTypes(typesArray);
    } catch (e) {}
  };

  useEffect(() => {
    fetchFileType();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-b from-black/60 to-gray-900/80 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-96 p-6 space-y-6 relative">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          Chỉnh sửa loại tệp được phép in
        </h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập loại tệp (ví dụ: pdf, png,...)"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
            onClick={() => handleAdd()}
          >
            Thêm
          </button>
        </div>
        <ul className="border border-gray-200 rounded-lg p-3 max-h-48 overflow-y-auto divide-y divide-gray-200">
          {types.map((type, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 hover:bg-gray-100 transition"
            >
              <span className="text-gray-700">{type}</span>
              <button
                className="text-red-500 hover:text-red-700 transition"
                onClick={() => handleDelete(type)}
              >
                Xóa
              </button>
            </li>
          ))}
          {types.length === 0 && (
            <li className="text-gray-500 text-center py-2">
              Không có loại tệp nào!
            </li>
          )}
        </ul>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
