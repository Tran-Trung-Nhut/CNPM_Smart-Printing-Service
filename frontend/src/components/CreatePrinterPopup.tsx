import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePrinterPopup({
    onClose,
    fetchPrinters, // Nhận hàm fetchPrinters từ props
  }: {
    onClose: () => void;
    fetchPrinters: () => void;
  }) {
    const navigate = useNavigate()
    const [branchName, setBranchName] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const status : string = 'enable'
    const [location, setLocation] = useState({
        campus: "",
        building: "",
        room: "",
    });

    const handleAdd = async () => {
        if (!branchName || !model || !description || !location.campus || !location.building || !location.room) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try{
            const response = await axios.post('http://localhost:3000/api/v1/printers',{
                branchName,
                model,
                description,
                status,
                location
            })

            fetchPrinters()
        }catch(e){
            console.log(e)
        }

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

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Hãng sản xuất</label>
                        <input
                            type="text"
                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
                            placeholder="Nhập tên chi nhánh"
                            value={branchName}
                            onChange={(e) => setBranchName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Model máy in</label>
                        <input
                            type="text"
                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
                            placeholder="Nhập model máy in"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                        <textarea
                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
                            placeholder="Mô tả về máy in"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Vị trí</label>
                        <div className="flex space-x-4">
                            <div className="w-1/3">
                                <label className="block text-sm">Khuôn viên</label>
                                <input
                                    type="text"
                                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
                                    placeholder="Khuôn viên"
                                    value={location.campus}
                                    onChange={(e) => setLocation({ ...location, campus: e.target.value })}
                                />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-sm">Tòa nhà</label>
                                <input
                                    type="text"
                                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
                                    placeholder="Tòa nhà"
                                    value={location.building}
                                    onChange={(e) => setLocation({ ...location, building: e.target.value })}
                                />
                            </div>
                            <div className="w-1/3">
                                <label className="block text-sm">Phòng</label>
                                <input
                                    type="text"
                                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
                                    placeholder="Phòng"
                                    value={location.room}
                                    onChange={(e) => setLocation({ ...location, room: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

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
