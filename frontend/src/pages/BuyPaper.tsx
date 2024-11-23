import React, { useState } from "react";

interface PaymentItem {
  id: number;
  quantity: string;
  time: string;
  date: string;
  status: string;
  amount: string;
  packageInfo?: string;
}

const BuyPaper: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const data: PaymentItem[] = [
    { id: 1, quantity: "Giấy lẻ: 15", time: "10g00", date: "20/10/2024", status: "Chờ thanh toán", amount: "40.000 đồng", packageInfo: "Gói 1 (SL:1), Gói 3 (SL:1)" },
    { id: 2, quantity: "Giấy lẻ:", time: "10g00", date: "20/10/2024", status: "Chờ thanh toán", amount: "20.000 đồng" },
    { id: 3, quantity: "Giấy lẻ:", time: "08g00", date: "20/10/2024", status: "Đã thanh toán", amount: "100.000 đồng" },
    { id: 4, quantity: "Giấy lẻ:", time: "07g59", date: "20/10/2024", status: "Đã thanh toán", amount: "50.000 đồng" },
    { id: 5, quantity: "Giấy lẻ:", time: "07g59", date: "20/10/2024", status: "Đã thanh toán", amount: "50.000 đồng" },
    { id: 6, quantity: "Giấy lẻ:", time: "15g30", date: "19/10/2024", status: "Đã huỷ", amount: "200.000 đồng" },
    { id: 7, quantity: "Giấy lẻ:", time: "13g30", date: "20/10/2024", status: "Đã thanh toán", amount: "5.000 đồng" },
    { id: 8, quantity: "Giấy lẻ:", time: "13g00", date: "20/10/2024", status: "Đã thanh toán", amount: "50.000 đồng" },
    { id: 9, quantity: "Giấy lẻ:", time: "12g00", date: "20/10/2024", status: "Đã huỷ", amount: "100.000 đồng" },
  ];

  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(term.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

  const totalAmount = selectedIds.reduce((sum, id) => {
    const item = data.find((item) => item.id === id);
    return item ? sum + parseFloat(item.amount.replace(/\./g, "").replace(" đồng", "")) : sum;
  }, 0);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="[background-image:linear-gradient(-90deg,_#6fb1fc,_#4364f7_50%,_#0052d4)]">
      <div className="p-4 min-h-screen pb-20">
        <div className="mb-4"></div>
        <div className="max-w-7xl mx-auto overflow-x-auto shadow-2xl">
        <table className="table-auto bg-white w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-xl">
            <thead className="bg-blue-100 text-left">
              <tr>
                <th colSpan={5}>
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      placeholder="Tìm kiếm..."
                      className="font-light w-1/3 p-1 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 ml-4 mt-2"
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <span className="mr-8">Vui lòng thanh toán trước 10p</span>
                  </div>
                </th>
              </tr>
              <tr>
              <th className="p-2 border-b">#</th>
              <th className="p-2 border-b">SỐ LƯỢNG</th>
              <th className="p-2 border-b">THỜI GIAN</th>
              <th className="p-2 border-b">TRẠNG THÁI</th>
              <th className="p-2 border-b">SỐ TIỀN</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-2 border-b">
                      {item.status === "Đã thanh toán" || item.status === "Đã huỷ" ? (
                        "-"
                      ) : (
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleSelect(item.id)}
                        />
                      )}
                    </td>
                    <td className="p-2 border-b">
                      {item.quantity}
                      {item.packageInfo && (
                        <div className="text-sm text-gray-500">{item.packageInfo}</div>
                      )}
                    </td>
                    
                    <td className="p-2 border-b">
                      {item.time} <br /> {item.date}
                    </td>
                    <td className="p-2 border-b">
                      <span
                        className={`px-2 py-1 rounded ${
                          item.status === "Chờ thanh toán"
                            ? "bg-purple-100 text-purple-600"
                            : item.status === "Đã thanh toán"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2 border-b">{item.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Không tìm thấy kết quả nào.
                  </td>
                </tr>
              )}
            </tbody>

            <tfoot className="bg-blue-100">
            <tr>
              <td colSpan={5} className="p-4">
                <div className="flex justify-between items-center">
                  {/* Bên trái: Tổng số hàng và chọn số hàng hiển thị */}
                  <div className="flex items-center space-x-4">
                    <span>Tổng số hàng: {data.length}</span>
                    <select
                      className="border border-gray-300 rounded px-2 py-1"
                      value={rowsPerPage}
                      onChange={handleRowsPerPageChange}
                    >
                      <option value={5}>5 hàng/trang</option>
                      <option value={10}>10 hàng/trang</option>
                      <option value={15}>15 hàng/trang</option>
                    </select>
                  </div>

                  {/* Bên phải: Điều hướng trang */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === 1
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Previous
                    </button>
                    <span>
                      Trang {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === totalPages
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <footer
        className="bg-blue-900 px-4 py-4 fixed bottom-0 left-0 w-full flex justify-between items-center"
      >
        <div>
        <p className="text-white text-lg ml-8">
        <strong>Đã chọn:</strong> {selectedIds.length}
        </p>
        </div>
        <div className="flex justify-center items-center space-x-4 text-lg mr-8">
        <p className="text-white">
          <strong>Số tiền cần thanh toán:</strong>{" "}
          {totalAmount.toLocaleString("vi-VN")} đồng
        </p>
        <button
          className="text-blue-600 bg-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white"
          onClick={() => alert("Thanh toán thành công!")}
        >
          Thanh toán ngay
        </button>
        </div>
      </footer>
    </div>
    </div>
  );
};

export default BuyPaper;

