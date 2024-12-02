import { OrderDto } from "../dtos/Order.dto";

export default function OrderDetailPopup({
  onClose,
  order,
}: {
  onClose: () => void;
  order: OrderDto;
}) {
  const formatCurrency = (totalCost: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(totalCost).replace('₫', 'đ');
  };

  const sumOfPaper = (): number => {
    let numOfPaper = 0;
    numOfPaper += order.quantityPaper;
    numOfPaper += order.quantityPackage1 * 50;
    numOfPaper += order.quantityPackage2 * 100;
    numOfPaper += order.quantityPackage3 * 200;
    return numOfPaper;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 text-left space-y-6 overflow-y-auto max-h-[80vh] transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-semibold text-blue-600 border-b-2 border-blue-200 pb-2">Chi tiết đơn hàng</h3>

        <div className="space-y-4 mt-4">
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Giấy lẻ:</p>
            <p className="text-gray-600">{order.quantityPaper}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Combo 50 tờ:</p>
            <p className="text-gray-600">{order.quantityPackage1}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Combo 100 tờ:</p>
            <p className="text-gray-600">{order.quantityPackage2}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Combo 200 tờ:</p>
            <p className="text-gray-600">{order.quantityPackage3}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Tổng số giấy:</p>
            <p className="text-gray-600">{sumOfPaper()}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Ngày đặt hàng:</p>
            <p className="text-gray-600">{new Date(order.dateOrder).toLocaleString()}</p>
          </div>

          <div className={`flex justify-between ${!order.datePaid ? 'bg-red-100 text-red-700' : ''} rounded-lg`}>
            <p className="font-medium text-gray-700">Ngày thanh toán:</p>
            <p className="text-gray-600">
              {order.datePaid ? new Date(order.datePaid).toLocaleString() : 'Chưa thanh toán'}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Số tiền:</p>
            <p className="text-gray-600 font-bold">{formatCurrency(order.totalCost)}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-gray-700 text-white py-2 px-6 rounded-md hover:bg-gray-800 transition duration-200"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
