import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import PrinterInformationPopup from "../components/PrinterInformationPopup";
import CreatePrinterPopup from "../components/CreatePrinterPopup";
import axios from "axios";
import { PrinterDto } from "../dtos/Printer.dto";


export default function Printer() {
    const [isShowInformation, setIsShowInformation] = useState<boolean>(false);
    const [isShowCreate, setIsShowCreate] = useState<boolean>(false)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [printer, setPrinter] = useState<PrinterDto[]>([])

    const totalPages = Math.ceil(printer.length / rowsPerPage);
    const currentData = Array.isArray(printer)
    ? printer.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
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

    const handleTurnOff = async (printer: PrinterDto) => {
        const response = window.confirm("Bạn có chắc muốn thay đổi trạng thái của máy in?")

        if(!response) return

        try{
            const newStatus = printer.status === 'enable'? 'disable': 'enable'

            console.log(printer.location.building, printer.location.room)

            const response = await axios.put(`http://localhost:3000/api/v1/printers/${printer.Printer_ID}`,{
                printer_ID: printer.Printer_ID,
                branchName: printer.branchName,
                model: printer.model,
                description: printer.description,
                status: newStatus,
                location: {
                    campus: printer.location.campus,
                    building: printer.location.building,
                    room: printer.location.room
                }
            })

            console.log(response)

            fetchPrinters()
        }catch(e: any){
            console.log(e.message)
            alert("Không thể thay đổi trạng thái của máy in ngay bây giờ! Vui lòng thử lại sau!")
        }
    }

    const handleDelete = async (printer_ID: number) =>{
        const res = window.confirm("Bạn có chắc muốn xóa máy in này? Khi xóa đi rồi sẽ không thể hồi phục lại được!")

        if(!res) return

        try{
            const response = await axios.delete(`http://localhost:3000/api/v1/printers/${printer_ID}`)
            console.log(response.data)
            fetchPrinters()
        }catch(e){
            alert("Không thể xóa máy in ngay lúc này! Vui lòng thử lại sau!")
        }
    }

    const fetchPrinters = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/printers'); 
            setPrinter(response.data.data);
        } catch (error) {
            setPrinter([])
        }
    }

    useEffect(() => {
        fetchPrinters();
    }, []); // 

    return (
        <div className="overflow-x-auto shadow-xl rounded flex flex-col justify-between items-center min-h-screen bg-white mt-5 mx-5">
            {isShowInformation && (
                <PrinterInformationPopup onClose={() => setIsShowInformation(false)} />
            )}
            {isShowCreate && (<CreatePrinterPopup onClose={() => setIsShowCreate(false)} fetchPrinters={() => fetchPrinters()}/>)}

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
                    onClick={() => setIsShowCreate(true)} 
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
                        {currentData.map((data: PrinterDto, index: number) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "" : "bg-gray-100"}
                            >
                                <td className="px-4 py-2 text-center">
                                    {(currentPage - 1) * rowsPerPage + index + 1}
                                </td>
                                <td className="px-4 py-3 text-center">{data.branchName}</td>
                                <td className="px-4 py-3 text-center">{data.model}</td>
                                <td className="px-4 py-3 text-center">{data.location?.campus} - {data.location?.building} - {data.location?.room}</td>
                                <td className={`px-4 py-3 text-center ${data.status === 'enable' ? 'text-green-500' : 'text-red-500'}`}>{data.status === 'enable' ? 'Hoạt động': 'Bảo trì'}</td>
                                <td className="px-4 py-3 text-center space-x-3">
                                    <button
                                        type="button"
                                        className={`${data.status === 'enable' ? 'text-green-400' : 'text-gray-400'} hover:scale-110 active:scale-90`}
                                        onClick={() => handleTurnOff(data)}
                                    >
                                        <i className="pi pi-power-off"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:scale-110 active:scale-90"
                                        onClick={() => setIsShowInformation(true)}
                                    >
                                        <i className="pi pi-info-circle"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="text-red-400 hover:scale-110 active:scale-90"
                                        onClick={() => handleDelete(data.Printer_ID)}
                                    >
                                        <i className="pi pi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-[#C6DCFE] h-12 flex items-center justify-between w-full rounded px-4">
                <div className="flex justify-center items-center space-x-2">
                    <p className="pl-2">Tổng số hàng: {printer.length}</p>
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
