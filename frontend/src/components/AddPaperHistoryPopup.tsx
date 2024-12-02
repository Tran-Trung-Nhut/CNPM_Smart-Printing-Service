import { useState, useEffect } from "react";
import { PrinterDto } from "../dtos/Printer.dto";
import axios from "axios";
import { PrintConfigurationDto } from "../dtos/PrintConfiguration.dto";
import "./css/StudentInformationPopup.css";
import { AddPaperDto } from "../dtos/AddPaper.dto";

export default function AddPaperHistoryPopup({
  onClose,
}: {
  onClose: () => void;
}) {
  const [addPaperHistory, setAddPaperHistory] = useState<AddPaperDto[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchAddPaperHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/paper`);
      setAddPaperHistory(response.data.data);
    } catch (error) {
      console.error("Error fetching print history:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchAddPaperHistory();
  }, []);

  const filteredData = addPaperHistory.filter((data: AddPaperDto) => {
    const isSearchMatch =
      (data.semester.toString().toLowerCase().includes(searchTerm.toLowerCase()));
    

    return isSearchMatch;
  });



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
        className="bg-white p-6 rounded-2xl shadow-2xl w-[90vw] max-w-4xl text-left space-y-6 mt-3 mb-5"
        onClick={(e) => e.stopPropagation()}
      >
  

        <div className="mt-6 space-y-4">
          <h3 className="text-2xl font-semibold text-indigo-600 text-center">Lịch sử thêm giấy học kỳ</h3>

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

          </div>

            <div className="overflow-x-auto mt-4">
              <table className="table-auto w-full bg-white">
                <thead className="bg-[#C6DCFE]">
                  <tr>
                    <th className="px-4 py-2 text-center">#</th>
                    <th className="px-4 py-2 text-center">MSCB</th>
                    <th className="px-4 py-2 text-center">Học kỳ</th>
                    <th className="px-4 py-2 text-center">Thời gian thêm</th>
                    <th className="px-4 py-2 text-center">Số giấy cấp</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data: AddPaperDto, index: number) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="px-4 py-3 text-center">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-3 text-center">{data.spso_ID}</td>
                      <td className="px-4 py-3 text-center">{data.semester}</td>
                      <td className="px-4 py-3 text-center">
                         {new Date(data.scheduler).toLocaleDateString('vi-VN', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false,
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {data.number}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
