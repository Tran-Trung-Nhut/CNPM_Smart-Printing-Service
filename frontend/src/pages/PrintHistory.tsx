import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import PrinterInformationPopup from "../components/PrinterInformationPopup";
import CreatePrinterPopup from "../components/CreatePrinterPopup";

interface DataType {
  printerID: string;
  file: string;
  requestedTime: string;
  printedTime: string;
}
  
const dataSource = Array.from({ length: 30 }).map<DataType>((_, i) => ({
  printerID: `Máy in Sony HP4 H6-11${i + 5}`,
  file: `Số file: ${i + 1}\nSố trang: ${10 + i}`,
  requestedTime: `10h00\n20/${10 + i}/2024`,
  printedTime: `10h30\n20/${10 + i}/2024`,
}));


export default function PrintHistory() {
    const [isShowInformation, setIsShowInformation] = useState<boolean>(false);
    const [isShowCreate, setIsShowCreate] = useState<boolean>(false)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.ceil(dataSource.length / rowsPerPage);
    const currentData = Array.isArray(dataSource)
    ? dataSource.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : [];

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1); 
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    }; 

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
                        className="w-64 pl-1 rounded placeholder:italic h-6"
                    />
                    <button
                        className="flex items-center justify-center bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200"
                    >
                        <i className="pi pi-search mr-1"></i> Tìm kiếm
                    </button>
                </div>
            </div>

                <table className="table-auto w-full bg-white">
                    <thead className="bg-[#C6DCFE]">
                        <tr>
                            <th className="px-4 py-2\3">#</th>
                            <th className="px-4 py-2">Máy in</th>
                            <th className="px-4 py-2">Số tệp</th>
                            <th className="px-4 py-2">Thời gian đăng ký</th>
                            <th className="px-4 py-2">Thời gian in</th>
                            <th className="px-4 py-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((data: DataType, index: number) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "" : "bg-gray-100"}
                            >
                                <td className="px-4 py-3 text-center">
                                    {(currentPage - 1) * rowsPerPage + index + 1}
                                </td>
                                <td className="px-4 py-3 text-center">{data.printerID}</td>
                                <td className="px-4 py-3 text-center">{data.file}</td>
                                <td className="px-4 py-3 text-center">{data.requestedTime}</td>
                                <td className="px-4 py-3 text-center">{data.printedTime}</td>
                                <td className="px-4 py-3 text-center">
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
                    <label className="pl-2 text-sm">Tổng số hàng: {dataSource.length}</label>
                    <div className="w-1 border-l-2 border-gray-200"></div>
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
                        className="px-2 py-1 border rounded hover:bg-gray-200 active:bg-gray-400"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Trước
                    </button>
                    <span className="text-sm">
                        Trang {currentPage}/{totalPages}
                    </span>
                    <button
                        className="px-2 py-1 border rounded over:bg-gray-200 active:bg-gray-400"
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
