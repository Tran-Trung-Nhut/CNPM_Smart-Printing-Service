import axios from "axios";
import { useEffect, useState } from "react";
import { UserDto } from "../dtos/User.dto";

export default function CreateNotificationPopup({ onClose }: { onClose: () => void }) {
    const [recipient, setRecipient] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [students, setStudents] = useState<UserDto[]>([]);

    const fetchRecipient = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/users?role=student');
            setStudents(response.data.data); 
        } catch (error) {
            setStudents([]);
        }
    };

    useEffect(() => {
        fetchRecipient();
    }, []); 

    const handleCreate = async () => {
        if (!title || !content) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            const notificationData = {
                title,
                content,
            };

            const response = await axios.post('http://localhost:3000/api/v1/notifications', notificationData);

            alert("Thông báo đã được tạo thành công!");
        } catch (error) {
            alert("Không thể tạo thông báo ngay lúc này! Vui lòng thử lại sau!");
        }

        onClose();
    };

    const handleRecipientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
        setRecipient(selectedValues);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="bg-gradient-to-br from-white via-blue-50 to-gray-100 p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg space-y-6 mt-40 mb-10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center space-y-2">
                    <div className="text-blue-600 bg-blue-100 p-4 rounded-full shadow-lg">
                        <i className="pi pi-bell text-3xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Tạo Thông Báo Mới</h3>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Người nhận</label>
                        <select
                            multiple
                            className="block w-full rounded-lg border border-gray-300 shadow-md focus:ring-blue-400 focus:border-blue-400 p-2 bg-white"
                            value={recipient}
                            onChange={handleRecipientChange}
                        >
                            <option value="All">Tất cả</option>
                            {students.map((student) => (
                                <option key={student.user_ID} value={student.user_ID}>
                                    {`${student.name} - ${student.user_ID}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                        <input
                            type="text"
                            className="block w-full rounded-lg border border-gray-300 shadow-md focus:ring-blue-400 focus:border-blue-400 p-2 bg-white placeholder-gray-400"
                            placeholder="Nhập tiêu đề thông báo"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                        <textarea
                            className="block w-full rounded-lg border border-gray-300 shadow-md focus:ring-blue-400 focus:border-blue-400 p-2 bg-white placeholder-gray-400"
                            rows={4}
                            placeholder="Nhập nội dung thông báo"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-200 shadow-md"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-md"
                    >
                        Tạo
                    </button>
                </div>
            </div>
        </div>
    );
}
