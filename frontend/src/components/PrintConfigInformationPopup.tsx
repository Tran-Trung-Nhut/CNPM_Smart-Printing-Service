import React from 'react';
import { PrintConfigurationDto } from '../dtos/PrintConfiguration.dto';

export default function PrintConfigInformation ({ onClose, config }: { onClose: () => void, config: PrintConfigurationDto }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            onClick={onClose} // Đóng popup khi bấm vào backdrop
        >
            <div
                className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-96 text-left space-y-6 overflow-y-auto max-h-[80vh]"
                onClick={(e) => e.stopPropagation()} // Ngăn sự kiện lan truyền
            >
                {/* Tiêu đề */}
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Thông tin cấu hình in</h2>

                {/* Thông tin về cấu hình in */}
                <div className="space-y-4 text-gray-700">
                    <p><strong>Mã máy in:</strong> <span className="text-gray-500">{config.printer_ID}</span></p>
                    <p><strong>Số trang:</strong> <span>{config.numPages}</span></p>
                    <p><strong>Số bản sao:</strong> <span>{config.numCopies}</span></p>
                    <p><strong>Kích thước giấy:</strong> <span>{config.paperSize}</span></p>
                    <p><strong>Chế độ in:</strong> 
                        <span>{config.printSide === 'single-sided' ? ' 1 mặt' : ' 2 mặt'} - {config.orientation === 'portrait' ? 'In dọc' : 'In ngang'}</span>
                    </p>
                    <p><strong>Thời gian đăng ký:</strong> 
                        <span> {new Date(config.printStart).toLocaleTimeString('vi-VN')}, {new Date(config.printStart).toLocaleDateString('vi-VN')}</span>
                    </p>
                    <p><strong>Thời gian in:</strong> 
                        <span className={`${config.printEnd ? 'text-gray-500' : 'text-red-600 font-semibold'}`}>
                            {config.printEnd ? new Date(config.printEnd).toLocaleDateString('vi-VN') : ' Chưa được in'}
                        </span>
                    </p>
                </div>

                {/* Hiển thị tài liệu */}
                <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 border-b-2 border-gray-200 pb-2 text-center">Danh sách tài liệu</h3>
                    <div className="space-y-3">
                        {config.documents.slice(0, 10).map((doc, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm border-l-4 border-gray-200 hover:border-gray-500 transition-all duration-300">
                                <p><strong>Tên tài liệu:</strong> <span className="text-gray-600">{doc.name}</span></p>
                                <p><strong>Kích thước:</strong> <span>{(doc.size / 1024).toFixed(2)} KB</span></p>
                                <p><strong>Ngày sửa:</strong> 
                                    <span> {new Date(doc.lastModifiedDate).toLocaleTimeString('vi-VN')}, {new Date(doc.lastModifiedDate).toLocaleDateString('vi-VN')}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nút đóng */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-gray-700 text-white py-2 px-6 rounded-md hover:bg-gray-800 transition duration-200"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

