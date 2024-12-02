import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { defaultPrintConfigurationDto, PrintConfigurationDto } from "../dtos/PrintConfiguration.dto";
import PrintConfigInformation from "../components/PrintConfigInformationPopupSPSO";


export default function PrintConfigList() {
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [printconfig, setPrintConfig] = useState<PrintConfigurationDto[]>([])
    const [selectedPrintConfig, setSelectedPrintConfig] = useState<PrintConfigurationDto>(defaultPrintConfigurationDto)
    const [isShowPrintConfig, setIsShowPrintConfig] = useState<boolean>(false)


    const totalPages = Math.ceil(printconfig.length / rowsPerPage);
    const currentData = Array.isArray(printconfig)
    ? printconfig.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
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

    const handlePrintDone = async (printconfig: PrintConfigurationDto) =>{
        const confirm = window.confirm("Hãy đồng ý nếu đơn in đã được in xong và sẵn sàng để sinh viên đến lấy!")

        if(!confirm) return

        try{
            const response = await axios.put(`http://localhost:3000/api/v1/printconfig/complete/${printconfig.config_ID}`)

            let contentDocument : string = '"'
            for(const doc of printconfig.documents){
                contentDocument += doc.name
                contentDocument += '", '
            }

            const res = await axios.get(`http://localhost:3000/api/v1/printers/${printconfig.printer_ID}`)

            const r = await axios.post('http://localhost:3000/api/v1/notifications/send',{
                userId: printconfig.user_ID,
                title: 'In hoàn thành',
                content: `Các tệp ${contentDocument}đã được in thành công.\n \n Vui lòng đến nhận tại trường Đại học Bách khoa - ${res.data.data.location.campus}, tòa ${res.data.data.location.building}, phòng ${res.data.data.location.room}.\n \nTrân trọng cảm ơn`,
            })

            fetchPrintConfig()
        }catch(e){
            console.log(e)
        }
    }

    const handleDelete = async (config_ID: number) => {
        const confirm = window.confirm("Bạn có chắc muốn xóa lượt in này? Sau khi xóa dữ liệu sẽ không thể khôi phục lại được!")

        if(!confirm) return

        try{
            const response = await axios.delete(`http://localhost:3000/api/v1/printconfig/${config_ID}`)

            fetchPrintConfig()

            alert("Xóa lượt in thành công!")
        }catch(e){
            console.log(e)
        }
    }

    const fetchPrintConfig = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/printconfig'); 
            setPrintConfig(response.data.data);
        } catch (error) {
            setPrintConfig([])
        }
    }

    useEffect(() => {
        fetchPrintConfig();
    }, []); // 

    return (
        <div className="overflow-x-auto shadow-xl rounded flex flex-col justify-between items-center min-h-screen bg-white mt-5 mx-5">
            {isShowPrintConfig && (
                <PrintConfigInformation
                onClose={() => setIsShowPrintConfig(false)}
                config={selectedPrintConfig}
                type="all"
                />
            )}

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

            </div>

                <table className="table-auto w-full bg-white">
                    <thead className="bg-[#C6DCFE]">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">MSSV</th>
                            <th className="px-4 py-2">Mã số máy in</th>
                            <th className="px-4 py-2">Thời gian đăng ký</th>
                            <th className="px-4 py-2">Thời gian in</th>
                            <th className="px-4 py-2">Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((data: PrintConfigurationDto, index: number) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "" : "bg-gray-100"}
                            >
                                <td className="px-4 py-2 text-center">
                                    {(currentPage - 1) * rowsPerPage + index + 1}
                                </td>
                                <td className="px-4 py-3 text-center">{data.user_ID}</td>
                                <td className="px-4 py-3 text-center">{data.printer_ID}</td>
                                <td className="px-4 py-3 text-center">
                                    {data.printStart
                                    ? new Date(data.printStart).toLocaleDateString('vi-VN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        })
                                    : "Không xác định"}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {data.printEnd
                                    ? new Date(data.printEnd).toLocaleDateString('vi-VN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        })
                                    : "Chưa được in"}
                                </td>
                                <td className="px-4 py-3 text-center space-x-3">
                                    {data.status === 'unCompleted' && (
                                        <button
                                            type="button"
                                            className="text-green-500 hover:scale-110 active:scale-90"
                                            onClick={() => handlePrintDone(data)}
                                        >
                                            <i className="pi pi-file-check"></i>
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:scale-110 active:scale-90"
                                        onClick={() => {
                                            setSelectedPrintConfig(data)
                                            setIsShowPrintConfig(true)
                                        }}
                                    >
                                        <i className="pi pi-info-circle"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="text-red-400 hover:scale-110 active:scale-90"
                                        onClick={() =>handleDelete(data.config_ID)}
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
                    <p className="pl-2">Tổng số hàng: {printconfig.length}</p>
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
