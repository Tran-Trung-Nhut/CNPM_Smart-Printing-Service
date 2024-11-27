import { useState } from "react";

export default function CreatePrinterPopup({ onClose }: { onClose: () => void }) {
    const [brand, setBrand] = useState<string>("");
    const [ID, setID] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [status, setStatus] = useState<string>("Hoạt động");

    const handleAdd = () => {
        if (!brand || !ID || !location) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        // Gửi dữ liệu máy in hoặc thực hiện hành động thêm máy in
        console.log("Thêm máy in thành công!", { brand, ID, location, status });

        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-8 rounded-xl shadow-2xl w-[90%] max-w-lg space-y-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center space-x-2">
                        <i className="pi pi-print text-2xl text-green-500"></i>
                        <h3 className="text-xl font-bold text-gray-800">Thêm máy in mới</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 transition duration-200"
                    >
                        <i className="pi pi-times text-2xl"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-6">
                    {/* Hãng máy in */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Hãng máy in</label>
                        <input
                            type="text"
                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
                            placeholder="VD: HP, Canon, Epson..."
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>

                    {/* Mã số máy in */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Mã số máy in</label>
                        <input
                            type="text"
                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
                            placeholder="Nhập mã số (VD: PR12345)"
                            value={ID}
                            onChange={(e) => setID(e.target.value)}
                        />
                    </div>

                    {/* Vị trí */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Vị trí</label>
                        <input
                            type="text"
                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
                            placeholder="VD: Tầng 1, Phòng 101..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    {/* Tình trạng */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Tình trạng</label>
                        <select
                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Hoạt động">Hoạt động</option>
                            <option value="Bảo trì">Bảo trì</option>
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    );
}
