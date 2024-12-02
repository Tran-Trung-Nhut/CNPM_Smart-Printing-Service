import { useState, useEffect } from "react";
import { PrinterDto } from "../dtos/Printer.dto";
import axios from "axios";
import { PrintConfigurationDto } from "../dtos/PrintConfiguration.dto";
import "./css/StudentInformationPopup.css";

export default function PrinterInformationPopup({
  printer,
  onClose,
  setPrintConfig,
  showPrintConfig,
}: {
  printer: PrinterDto;
  onClose: () => void;
  setPrintConfig: (value: PrintConfigurationDto) => void;
  showPrintConfig: (value: boolean) => void;
}) {
  const [printHistory, setPrintHistory] = useState<PrintConfigurationDto[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Fetch print history based on Printer ID
  const fetchPrintHistory = async (printer_ID: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/printconfig?printer_ID=${printer_ID}`);
      setPrintHistory(response.data.data);
    } catch (error) {
      console.error("Error fetching print history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrintHistory(printer.Printer_ID);
  }, [printer]);

  const filteredData = printHistory.filter((data: PrintConfigurationDto) => {
    const isSearchMatch =
      (data.printer_ID.toString().toLowerCase().includes(searchTerm.toLowerCase()));
    
    const isDateMatch =
      (!startDate || new Date(data.printStart) >= new Date(startDate)) &&
      (!endDate || new Date(data.printStart) <= new Date(endDate));

    return isSearchMatch && isDateMatch;
  });

  const queue = printHistory.reduce((count, printer) => {
    return printer.printEnd ? count : count + 1;
  }, 0);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-2xl w-[90vw] max-w-4xl text-left space-y-6 mt-40 mb-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-semibold text-center text-indigo-600">
          Thông tin máy in
        </h2>

        <div className="space-y-4">
          {/* Các thông tin máy in */}
          <div className="flex justify-between text-lg">
            <span className="font-semibold text-gray-700">Tên hãng sản xuất:</span>
            <span className="text-gray-600">{printer.branchName}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold text-gray-700">Mô tả:</span>
            <span className="text-gray-600">{printer.description}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold text-gray-700">Mô hình:</span>
            <span className="text-gray-600">{printer.model}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold text-gray-700">Vị trí:</span>
            <span className="text-gray-600">{`${printer.location.campus}, ${printer.location.building}, ${printer.location.room}`}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold text-gray-700">Trạng thái:</span>
            <span 
            className={`${printer.status === 'enable'? 'text-green-600': 'text-red-500'}`}>
                {printer.status === 'enable'? 'Đang hoạt động' : 'Bảo trì'}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold text-gray-700">Tổng số lần in:</span>
            <span className="text-gray-600">{printHistory.length}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold text-gray-700">Hàng đợi:</span>
            <span className="text-gray-600">{queue}</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold text-indigo-600">Lịch sử in</h3>

          <div className="flex justify-between items-center mt-4">
            <div className="flex w-1/2">
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Nhập thông tin tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-4 w-1/2 justify-end">
              <div className="flex flex-col w-1/3">
                <label className="text-sm font-semibold">Từ ngày:</label>
                <input
                  type="date"
                  className="p-2 border rounded"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label className="text-sm font-semibold">Đến ngày:</label>
                <input
                  type="date"
                  className="p-2 border rounded"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-gray-500">Đang tải...</div>
          ) : (
            <div className="overflow-x-auto mt-4">
              <table className="table-auto w-full bg-white">
                <thead className="bg-[#C6DCFE]">
                  <tr>
                    <th className="px-4 py-2 text-center">#</th>
                    <th className="px-4 py-2 text-center">MSSV</th>
                    <th className="px-4 py-2 text-center">Số tệp</th>
                    <th className="px-4 py-2 text-center">Thời gian đăng ký</th>
                    <th className="px-4 py-2 text-center">Thời gian in</th>
                    <th className="px-4 py-2 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data: PrintConfigurationDto, index: number) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="px-4 py-3 text-center">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-3 text-center">{data.printer_ID}</td>
                      <td className="px-4 py-3 text-center">{data.documents.length}</td>
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
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          className="text-gray-400 hover:scale-110 active:scale-90"
                          onClick={() => {
                            setPrintConfig(data)
                            showPrintConfig(true)
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
          )}
        </div>

        {/* Điều hướng trang */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-2">
            <label className="text-sm">Số hàng mỗi trang:</label>
            <select
              className="p-1 border rounded"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Trước
            </button>
            <span className="text-sm">
              Trang {currentPage}/{totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Sau
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
