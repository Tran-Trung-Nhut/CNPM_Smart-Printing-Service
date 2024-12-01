import React, { useEffect, useState } from 'react';
import printer from '../assets/printer.png';
import { Steps } from 'antd';
import { PrinterOutlined, SmileOutlined, UploadOutlined, SettingOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { PrinterDto } from '../dtos/Printer.dto';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { printerIDState } from '../state';

interface PrinterProps {
    id: number;
    position: string;
    queue: number;
    status: string;
}

const PrinterCard: React.FC<PrinterProps> = ({ id, position, queue, status }) => {
    const navigate = useNavigate();
    const setPrinterID = useSetRecoilState(printerIDState)

    const handleChoosePrinter = (printer_ID: number) => {
        setPrinterID(printer_ID)
        navigate('/print-config')
    }

    return (
        <div
            className={`flex flex-col items-center justify-center p-4 border-[1px] border-gray-300 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ${status !== 'enable' ? 'opacity-50' : ''}`}
        >
            <div className="flex items-start space-x-4">
                <img src={printer} className="w-24 h-24 object-cover" alt="Printer" />
                <div className="flex flex-col space-y-4 text-center">
                    <div className="font-bold text-lg">
                        <p>Vị trí: {position}</p>
                    </div>
                    <div className="font-bold text-lg">
                        <p>Hàng đợi: {queue}</p>
                    </div>
                    <div className={`font-bold text-lg ${status === 'enable' ? 'text-green-600' : 'text-red-600'}`}>
                        <p>Trạng thái: {status === 'enable' ? 'Hoạt động' : 'Bảo trì'}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <button
                    disabled={status === 'disable'}
                    className="px-6 py-2 text-lg font-bold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
                    onClick={() => handleChoosePrinter(id)}
                >
                    Chọn
                </button>
            </div>
        </div>
    );
};

export default function ChoosePrinter() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [printer, setPrinter] = useState<PrinterDto[]>([]);
    const printersPerPage = 6;

    const filteredData = printer.filter(printerItem =>
        printerItem.location.campus.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastPrinter = currentPage * printersPerPage;
    const indexOfFirstPrinter = indexOfLastPrinter - printersPerPage;
    const currentPrinters = filteredData.slice(indexOfFirstPrinter, indexOfLastPrinter);

    const totalPages = Math.ceil(filteredData.length / printersPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const fetchPrinters = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/printers');
            setPrinter(response.data.data);
        } catch (error) {
            alert('Lấy danh sách máy in thất bại!');
        }
    };

    useEffect(() => {
        fetchPrinters();
    }, []);

    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 min-h-screen py-6 px-4 mt-5">
            <div className="flex items-center justify-center">
                <Steps
                    current={1}
                    className="space-x-8 mb-6 w-2/3"
                    items={[
                        { title: 'Tải lên', status: 'finish', icon: <UploadOutlined /> },
                        { title: 'Chọn máy in', status: 'process', icon: <PrinterOutlined /> },
                        { title: 'Tùy chỉnh thông số in', status: 'wait', icon: <SettingOutlined /> },
                        { title: 'Hoàn thành', status: 'wait', icon: <SmileOutlined /> },
                    ]}
                />
            </div>

            {/* Tìm kiếm */}
            <div className="flex justify-center items-center space-x-2 mb-6">
                <input
                    className="px-4 py-2 w-96 rounded-lg bg-white text-gray-700 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập địa chỉ, ví dụ H1-101..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="pi pi-search" style={{ fontSize: '20px', color: 'gray' }} />
            </div>

            {/* Danh sách máy in */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {currentPrinters.map((printerItem, key) => (
                    <PrinterCard
                        key={key + 1}
                        id={printerItem.Printer_ID}
                        position={`${printerItem.location.campus} - ${printerItem.location.building} - ${printerItem.location.room}`}
                        queue={0}
                        status={printerItem.status}
                    />
                ))}
            </div>

            <div className="bg-[#C6DCFE] h-12 flex items-center justify-between w-full rounded px-4 mt-2">
                <p className="pl-2 text-sm text-left flex-1">Tổng số máy in: {printer.length}</p>

                <div className="flex justify-center items-center space-x-2 mx-2">
                    <button
                        onClick={() => navigate('/print')}
                        className="w-32 px-4 py-2 bg-gray-300 text-black rounded-md flex items-center justify-center hover:bg-gray-400 transition"
                    >
                        <LeftOutlined className="mr-2" /> Quay lại
                    </button>
                </div>

                <div className="flex items-center space-x-2 flex-1 justify-end">
                    <button
                        className="px-2 py-1 border rounded bg-slate-300"
                        onClick={previousPage}
                        disabled={currentPage === 1}
                    >
                        Trước
                    </button>
                    <span className="text-sm">
                        Trang {currentPage}/{totalPages}
                    </span>
                    <button
                        className="px-2 py-1 border rounded bg-slate-300"
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                    >
                        Sau
                    </button>
                </div>
            </div>
        </div>
    );
}
