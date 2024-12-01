import axios from "axios";
import React, { useEffect, useState } from "react";
import { OrderDto } from "../dtos/Order.dto";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

const BuyPaperHistory: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState<OrderDto[]>([])
  const [orderNeedToPay, setOrderNeedToPay] = useState<OrderDto[]>([])
  const user = useRecoilValue(userState)


  const [filteredData, setFilteredData] = useState(order);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = order.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(term.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const totalAmount = selectedIds.reduce((sum, order_ID) => {
    const item = order.find((item) => item.order_ID === order_ID);
    return item ? sum + parseFloat(item.totalCost.toString() ) : sum;
  }, 0);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const newSelectedIds = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
  

      const updatedOrders = newSelectedIds
        .map((selectedId) => order.find((order) => order.order_ID === selectedId))
        .filter((order): order is OrderDto => order !== undefined); 
  
      setOrderNeedToPay(updatedOrders);
  
      return newSelectedIds;
    });
  };
  

  function formatCurrency(totalCost: number) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(totalCost).replace('₫', 'đ');
  }

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

  const formatDateForMySQL = async (date: Date) =>  {
    const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    return formattedDate;
  }

  const handlePay = async () => {
    if (orderNeedToPay.length === 0) {
      alert("Không có đơn hàng nào được chọn để thanh toán!");
      return;
    }

    const confirm = window.confirm(`Bạn có chắc muốn thanh toán ${formatCurrency(totalAmount)} không?`)

    if(!confirm) return

    try{
      let numOfPaper: number = 0

      for(const ord of orderNeedToPay){
        numOfPaper += ord.quantityPaper
        numOfPaper += ord.quantityPackage1 * 50
        numOfPaper += ord.quantityPackage2 * 100
        numOfPaper += ord.quantityPackage3 * 200

        const response = await axios.put(`http://localhost:3000/api/v1/order/${ord.order_ID}`,{
          order_ID: ord.order_ID,
          user_ID: ord.user_ID,
          quantityPaper: ord.quantityPaper,
          quantityPackage1: ord.quantityPackage1,
          quantityPackage2: ord.quantityPackage2,
          quantityPackage3: ord.quantityPackage3,
          totalCost: ord.totalCost,
          dateOrder: await formatDateForMySQL(ord.dateOrder),
          datePaid: new Date().toISOString().slice(0, 19).replace('T', ' '),
          status: 'đã thanh toán'
        })
      }


      const resGetUserInfo = await axios.get(`http://localhost:3000/api/v1/users/${user.user_ID}`)

      const resUpdateUser = await axios.put(`http://localhost:3000/api/v1/users/${user.user_ID}`,{
        user_ID: resGetUserInfo.data.data.user_ID,
        email: resGetUserInfo.data.data.email,
        password: resGetUserInfo.data.data.password,
        name: resGetUserInfo.data.data.name,
        role: resGetUserInfo.data.data.role,
        pageBalance: resGetUserInfo.data.data.pageBalance + numOfPaper
      })

      console.log(resUpdateUser.data)

      fetchOrders()
      alert("Thanh toán thành công!")
    }catch(e){

    }
  }

  const fetchOrders = async () => {
    try{
      const response = await axios.get('http://localhost:3000/api/v1/order')
      setOrder(response.data.data)
      setFilteredData(response.data.data)
    }catch(e){
      setOrder([])
    }
  }

  useEffect(() => {
    fetchOrders()

  }, [])

  return (
    <div className="[background-image:linear-gradient(-90deg,_#6fb1fc,_#4364f7_50%,_#0052d4)]">
      <div className="p-4 min-h-screen flex flex-col pb-20">
        <div className="flex-grow"> 
          <div className="max-w-7xl mx-auto overflow-x-auto shadow-2xl">
            <table className="table-auto bg-white w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-xl">
              <thead className="bg-blue-100 text-left">
                <tr>
                  <th colSpan={6}>
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="font-light w-1/3 p-1 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 ml-4 mt-2 text-sm"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                  </th>
                
                </tr>
                <tr>
                  <th className="p-2 border-b text-sm text-center">#</th>
                  <th className="p-2 border-b text-sm text-center">Số lượng</th>
                  <th className="p-2 border-b text-sm text-center">Thời gian mua</th>
                  <th className="p-2 border-b text-sm text-center">Trạng thái</th>
                  <th className="p-2 border-b text-sm text-center">Số tiền</th>
                  <th className="p-2 border-b text-sm text-center">Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((item) => (
                    <tr key={item.order_ID} className="hover:bg-gray-50">
                      <td className="p-2 border-b text-sm text-center">
                        {item.status === "đã thanh toán" ? (
                          "-"
                        ) : (
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(item.order_ID)}
                            onChange={() => handleSelect(item.order_ID)}
                          />
                        )}
                      </td>
                      <td className="p-2 border-b text-sm text-center">
                        {item.quantityPaper > 0? `Giấy lẻ: ${item.quantityPaper},`: ''}
                        {item.quantityPackage1 > 0? `Combo 50 tờ: ${item.quantityPackage1},`: ''}
                        {item.quantityPackage2 > 0? `Combo 100 tờ: ${item.quantityPackage2},`: ''}
                        {item.quantityPackage3 > 0? `Combo 200 tờ: ${item.quantityPackage3}`: ''}
                      </td>
                      <td className="p-2 border-b text-sm text-center">
                        {new Date(item.dateOrder).toLocaleTimeString('vi-VN')}, {new Date(item.dateOrder).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="p-2 border-b text-sm text-center">
                        <span
                          className={`px-2 py-1 rounded ${
                            item.status === "chưa thanh toán"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2 border-b text-sm text-center">{formatCurrency(item.totalCost)}</td>
                      <td className="p-2 border-b text-sm text-center">
                        <button className="hover:scale-110 active:scale-90">
                          <i className="pi pi pi-info-circle" style={{color: 'gray'}}/>
                        </button>
                      </td>
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
                  <td colSpan={6} className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4 text-sm">
                        <span>Tổng số hàng: {order.length}</span>
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

                      <div className="flex items-center space-x-4 text-sm">
                        <button
                          onClick={handlePreviousPage}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === 1
                              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          Trước
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
                          Sau
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <footer className="bg-blue-900 fixed px-4 py-4 bottom-0 left-0 w-full flex justify-between items-center z-1001">
          <div>
            <p className="text-white text-sm ml-8">
              <strong>Đã chọn:</strong> {selectedIds.length}
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4 text-sm mr-8">
            <p className="text-white">
              <strong>Số tiền cần thanh toán:</strong> {totalAmount.toLocaleString("vi-VN")} đồng
            </p>
            <div className="flex space-x-4">
            {/* <button
                className="text-red-600 bg-white px-4 py-2 rounded-lg hover:bg-red-700 hover:text-white"
                onClick={() => {
                  if (window.confirm("Bạn có chắc chắn muốn hủy đơn mua?")) {
                    setSelectedIds([]);
                    alert("Đơn mua đã bị hủy.");
                  }
                }}
              >
                Hủy đơn mua
              </button> */}
              <button
                className="text-blue-600 bg-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white"
                onClick={() => handlePay()}
              >
                Thanh toán ngay
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>

  );
};

export default BuyPaperHistory;
