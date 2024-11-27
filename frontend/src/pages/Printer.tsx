import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import PrinterInformationPopup from "../components/PrinterInformationPopup";
import CreatePrinterPopup from "../components/CreatePrinterPopup";
import axios from "axios";

interface Printer {
    brand: string;
    ID: string;
    location: string;
    status: string;
}

const datas = Array.from({ length: 30 }).map<Printer>((_, i) => ({
    brand: `Dell`,
    ID: `${i}`,
    location: `H1-CS${i % 2 === 0 ? 2 : 1}`,
    status: `${i % 2 === 0 ? 'Hoạt động' : 'Bảo trì'}`,
}));

export default function Printer() {
    const [isShowInformation, setIsShowInformation] = useState<boolean>(false);
    const [isShowCreate, setIsShowCreate] = useState<boolean>(false)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [printer, setPrinter] = useState<any>()

    const totalPages = Math.ceil(datas.length / rowsPerPage);
    const currentData = datas.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1); 
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const fetchPrinters = async () => {
        try {
            const response = await axios.get('/api/printers'); 
            setPrinter(response.data);
        } catch (error) {
            alert('Get printer false!')
        }
    }

    useEffect(() => {
        fetchPrinters()
    }, [printer])

    return (
        <div className="overflow-x-auto shadow-xl rounded flex flex-col justify-between items-center min-h-screen bg-white mt-5 mx-5">
            {isShowInformation && (
                <PrinterInformationPopup onClose={() => setIsShowInformation(false)} />
            )}
            {isShowCreate && (<CreatePrinterPopup onClose={() => setIsShowCreate(false)}/>)}

            <div className="w-full">
            <div className="bg-[#C6DCFE] flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                    <input
                        placeholder="Nhập thông tin tìm kiếm"
                        className="w-64 pl-1 rounded placeholder:italic"
                    />
                    <button
                        className="flex items-center justify-center bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200"
                    >
                        <i className="pi pi-search mr-1"></i> Tìm kiếm
                    </button>
                </div>

                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                    onClick={() => setIsShowCreate(true)} // Mở popup thêm máy in
                >
                    <i className="pi pi-print mr-2"></i> Thêm máy in
                </button>
            </div>

                <table className="table-auto w-full bg-white">
                    <thead className="bg-[#C6DCFE]">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Hãng máy in</th>
                            <th className="px-4 py-2">Mã số máy in</th>
                            <th className="px-4 py-2">Vị trí</th>
                            <th className="px-4 py-2">Tình trạng</th>
                            <th className="px-4 py-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((data, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "" : "bg-gray-100"}
                            >
                                <td className="px-4 py-2 text-center">
                                    {(currentPage - 1) * rowsPerPage + index + 1}
                                </td>
                                <td className="px-4 py-2 text-center">{data.brand}</td>
                                <td className="px-4 py-2 text-center">{data.ID}</td>
                                <td className="px-4 py-2 text-center">{data.location}</td>
                                <td className="px-4 py-2 text-center">{data.status}</td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        type="button"
                                        className="text-gray-400"
                                        onClick={() => setIsShowInformation(true)}
                                    >
                                        <i className="pi pi-info-circle"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-[#C6DCFE] h-12 flex items-center justify-between w-full rounded px-4">
                <div className="flex justify-center items-center space-x-2">
                    <p className="pl-2">Tổng số hàng: {datas.length}</p>
                    <div className="border-x-2 border-black"></div>
                    <div className="flex items-center space-x-2">
                    <label htmlFor="rows-per-page" className="text-sm">
                        Số hàng mỗi trang:
                    </label>
                    <select
                        id="rows-per-page"
                        className="rounded border-gray-300 p-1"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        className="px-2 py-1 border rounded"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Trước
                    </button>
                    <span className="text-sm">
                        Trang {currentPage}/{totalPages}
                    </span>
                    <button
                        className="px-2 py-1 border rounded"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Sau
                    </button>
                </div>
            </div>
        </div>
    );
}
