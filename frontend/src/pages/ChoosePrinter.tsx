import React, { useState } from 'react';
import printer from '../assets/printer.png'
import { Steps } from 'antd';
import { PrinterOutlined, SmileOutlined, UploadOutlined, SettingOutlined, FileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface PrinterProps {
    id: number;
    position: string;
    queue: number;
    status: string;
}

const data: PrinterProps[] = [
    { id: 1, position: "H1-201", queue: 10, status: "Hoạt động" },
    { id: 2, position: "H1-301", queue: 11, status: "Hoạt động" },
    { id: 3, position: "H2-401", queue: 12, status: "Bảo trì" },
    { id: 4, position: "H2-601", queue: 13, status: "Hoạt động" },
    { id: 5, position: "H1-701", queue: 14, status: "Hoạt động" },
    { id: 6, position: "H1-801", queue: 15, status: "Bảo trì" },
    { id: 7, position: "H1-201", queue: 10, status: "Hoạt động" },
    { id: 8, position: "H1-301", queue: 11, status: "Hoạt động" },
    { id: 9, position: "H2-401", queue: 12, status: "Bảo trì" },
    { id: 10, position: "H2-601", queue: 13, status: "Hoạt động" },
    { id: 11, position: "H3-701", queue: 14, status: "Hoạt động" },
    { id: 12, position: "H3-801", queue: 15, status: "Bảo trì" },
];

const PrinterCard: React.FC<PrinterProps> = ({ id, position, queue, status }) => {
    const navigate = useNavigate()
    
    return (
        <div
            className={`flex-col items-center justify-center p-2 border-[1px] border-white rounded-lg overflow-hidden ${status !== 'Hoạt động' ? 'opacity-30' : ''}`}
        >
            <div className="flex items-start">
                <img src={printer} className="w-full max-w-[200px]" alt="Printer" />
                <div className="flex-col items-center justify-center">
                    <div className="relative flex mr-4">
                        <div className="w-12 h-12 bg-yellow-100 text-black text-[25px] font-bold flex items-center justify-center rounded-full">
                            <p>{id}</p>
                        </div>
                        <div className="absolute left-12 top-6 h-[3px] w-16 bg-white"></div>
                        <div className="absolute left-16 top-6 h-[120px] w-[3px] bg-white"></div>
                        <div className="absolute left-16 top-20 h-[3px] w-12 bg-white"></div>
                        <div className="absolute left-16 top-36 h-[3px] w-12 bg-white"></div>
                        <div className="flex-col flex justify-center items-center text-center space-y-8 ml-16 mt-3">
                            <div className="bg-white rounded w-28 font-bold">
                                <p>Vị trí: {position}</p>
                            </div>
                            <div className="bg-white rounded w-28 font-bold">
                                <p>Hàng đợi: {queue}</p>
                            </div>
                            <div className={`${status === 'Hoạt động' ? 'text-center bg-green-300 rounded w-28 font-bold' : 'text-center bg-red-300 rounded w-28 font-bold'}`}>
                                <p>Trạng thái:</p>
                                <p>{status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button 
                disabled={status === "Bảo trì"}
                className="border-[3px] bg-white text-blue-700 border-black w-20 text-[20px] hover:scale-110 rounded-lg font-bold"
                onClick={() => navigate('/print-config')}>
                    Chọn
                </button>
            </div>
        </div>
    );
};


export default function ChoosePrinter() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const printersPerPage = 6;

    // Filter the data based on search query
    const filteredData = data.filter(printerItem =>
        printerItem.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Determine the slice of data to display on the current page
    const indexOfLastPrinter = currentPage * printersPerPage;
    const indexOfFirstPrinter = indexOfLastPrinter - printersPerPage;
    const currentPrinters = filteredData.slice(indexOfFirstPrinter, indexOfLastPrinter);

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / printersPerPage);

    // Handle page navigation
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

    return (
        <div className="">

            <Steps
                current={0}
                className="space-x-8 w-full p-b"
                style={{ display: 'flex', justifyContent: 'space-between' }}
                items={[
                    { title: 'Tải lên', status: 'wait', icon: <UploadOutlined/> },
                    { title: 'Chọn máy in', status: 'process', icon: <PrinterOutlined /> },
                    { title: 'Tùy chỉnh thông số in', status: 'wait', icon: <SettingOutlined /> },
                    { title: 'Xem trước khi in', status: 'wait', icon: <FileOutlined    /> },
                    { title: 'Hoàn thành', status: 'wait', icon: <SmileOutlined /> },
                ]}
                />

            <div className='flex flex-col min-h-screen w-full overflow-hidden'>
            <div className="space-y-2 ml-3 mt-2">
                <div className="text-white font-bold text-xl w-full">
                    <p>Tìm máy in:</p>
                </div>
                <input
                    className="bg-opacity-25 bg-white placeholder:text-black w-96 rounded italic placeholder:text-opacity-50"
                    placeholder="Nhập địa chỉ, ví dụ H1-101..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="space-y-20 translate-y-10 transform flex-grow">
                {/* Printer Grid Layout */}
                <div className="grid grid-cols-3 gap-2 w-full">
                    {currentPrinters.map(printerItem => (
                        <PrinterCard
                            key={printerItem.id}
                            id={printerItem.id}
                            position={printerItem.position}
                            queue={printerItem.queue}
                            status={printerItem.status}
                        />
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center fixed bottom-5 w-full space-x-4 mt-4 pb-8">
                    <button
                        onClick={previousPage}
                        disabled={currentPage === 1}
                        className="bg-white text-black px-2 py-1 text-sm rounded-md hover:bg-gray-300 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <p className="text-white text-sm">
                        Trang {currentPage} / {totalPages}
                    </p>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="bg-white text-black px-5 py-1 text-sm rounded-md hover:bg-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
}