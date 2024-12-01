import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import PrinterInformationPopup from "../components/PrinterInformationPopup";
import CreatePrinterPopup from "../components/CreatePrinterPopup";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { documentState, errorState, userState } from "../state";
import axios from "axios";
import { defaultPrintConfigurationDto, PrintConfigurationDto } from "../dtos/PrintConfiguration.dto";
import PrintConfigInformation from "../components/PrintConfigInformationPopup";



export default function PrintHistory() {
    const setDocument = useSetRecoilState(documentState)
    const [isShowInformation, setIsShowInformation] = useState<boolean>(false);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [printConfig, setPrintConfig] = useState<PrintConfigurationDto[]>([])
    const [selectedPrintConfig, setSelectedPrintConfig] = useState<PrintConfigurationDto>(defaultPrintConfigurationDto)
    const user = useRecoilValue(userState)
    const setError = useSetRecoilState(errorState)

    const totalPages = Math.ceil(printConfig.length / rowsPerPage);
    const currentData = Array.isArray(printConfig)
    ? printConfig.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
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

    const fetchPrintConfiguration = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/printconfig?user_ID=${user.user_ID}`);
            console.log(response.data.data)

            setPrintConfig(response.data.data)
        } catch (error: any) {
            if(error.response.data.message !== 'No print configurations found') alert('Get configuration false!')
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        fetchPrintConfiguration()
        setDocument([])
        setError('')
    }, [])

    return (
        <div className="overflow-x-auto shadow-xl rounded flex flex-col justify-between items-center min-h-screen bg-white mt-5 mx-5">
            {isShowInformation && (
                <PrintConfigInformation 
                onClose={() => setIsShowInformation(false)} 
                config={selectedPrintConfig}
                />
            )}

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
                        {currentData.map((data: PrintConfigurationDto, index: number) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "" : "bg-gray-100"}
                            >
                                <td className="px-4 py-3 text-center">
                                    {(currentPage - 1) * rowsPerPage + index + 1}
                                </td>
                                <td className="px-4 py-3 text-center">{data.printer_ID}</td>
                                <td className="px-4 py-3 text-center">{data.documents.length}</td>
                                <td className="px-4 py-3 text-center">
                                    {data.printStart ? 
                                        new Date(data.printStart).toLocaleDateString('vi-VN', {
                                            hour: '2-digit', 
                                            minute: '2-digit',
                                            hour12: false,
                                            day: '2-digit', 
                                            month: '2-digit', 
                                            year: 'numeric'
                                        }) : 
                                        'Không xác định'}
                                </td>                           
                                <td className="px-4 py-3 text-center">{data.printEnd ? 
                                        new Date(data.printEnd).toLocaleDateString('vi-VN', {
                                            hour: '2-digit', 
                                            minute: '2-digit',
                                            hour12: false,
                                            day: '2-digit', 
                                            month: '2-digit', 
                                            year: 'numeric'
                                        }) : 
                                        'Chưa được in'}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        type="button"
                                        className="text-gray-400"
                                        onClick={() => {
                                            setSelectedPrintConfig(data)
                                            setIsShowInformation(true)
                                        }}
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
                    <label className="pl-2 text-sm">Tổng số hàng: {printConfig.length}</label>
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
