import { useState } from "react";

export default function CreateNotificationPopup({ onClose }: { onClose: () => void }) {
    const [recipient, setRecipient] = useState<string>("All");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const handleCreate = () => {
        if (!title || !content) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-gradient-to-br from-white via-blue-50 to-gray-100 p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg space-y-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex flex-col items-center space-y-2">
                    <div className="text-blue-600 bg-blue-100 p-4 rounded-full shadow-lg">
                        <i className="pi pi-bell text-3xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Tạo Thông Báo Mới</h3>
                </div>

                {/* Body */}
                <div className="space-y-6">
                    {/* Người nhận */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Người nhận</label>
                        <select
                            className="block w-full rounded-lg border border-gray-300 shadow-md focus:ring-blue-400 focus:border-blue-400 p-2 bg-white"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Sinh viên">Sinh viên</option>
                            <option value="Giảng viên">Giảng viên</option>
                            <option value="Nhân viên">Nhân viên</option>
                        </select>
                    </div>

                    {/* Tiêu đề */}
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

                    {/* Nội dung */}
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

                {/* Footer */}
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
