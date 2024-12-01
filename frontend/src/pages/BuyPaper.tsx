import React, { useState } from 'react'; 
import paper from "../assets/paper.png"
import { useNavigate } from 'react-router-dom';

interface CartItem {
  description: string;
  quantity: number;
  price: number;
}

interface Package {
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
}

const PaperShop: React.FC = () => {
    const navigate = useNavigate()
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedPackage, setSelectedPackage] = useState<Package>({
    description: 'Giấy lẻ',
    price: 500,
    originalPrice: 500,
    discount: 0,
  });
  const [stock, setStock] = useState<number>(0);
  const [tempStock, setTempStock] = useState<number>(0);
  const [cart, setCart] = useState<CartItem[]>([]);

  const packages: Package[] = [
    { description: 'Giấy lẻ', price: 500, originalPrice: 500, discount: 0 },
    { description: 'Combo 50 tờ', price: 20000, originalPrice: 25000, discount: 20 },
    { description: 'Combo 100 tờ', price: 45000, originalPrice: 50000, discount: 10 },
    { description: 'Combo 200 tờ', price: 80000, originalPrice: 100000, discount: 20 },
  ];

  const addToCart = (): void => {
    const existingItem = cart.find(
      (item) => item.description === selectedPackage.description
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      setCart([...cart, { ...selectedPackage, quantity }]);
    }

    let addedStock = getStockChange(selectedPackage.description, quantity);
    setTempStock(tempStock + addedStock);
    setQuantity(1);
  };

  const checkout = (): void => {
    setStock(tempStock);
    setCart([]);
  };

  const calculateTotal = (): number => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const removeItemFromCart = (index: number): void => {
    const removedItem = cart[index];
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);

    const removedStock = getStockChange(removedItem.description, -removedItem.quantity);
    setTempStock(tempStock + removedStock);
  };

  const getStockChange = (description: string, quantityChange: number): number => {
    let addedStock = 0;
    switch (description) {
      case 'Combo 200 tờ':
        addedStock = 200 * quantityChange;
        break;
      case 'Combo 100 tờ':
        addedStock = 100 * quantityChange;
        break;
      case 'Combo 50 tờ':
        addedStock = 50 * quantityChange;
        break;
      case 'Giấy lẻ':
        addedStock = 1 * quantityChange;
        break;
      default:
        break;
    }
    return addedStock;
  };

  return (
    <div className="p-6 flex gap-6 text-sm">
      {/* Left Section */}
      <div className="w-full md:w-1/2 shadow-lg rounded-lg p-6 flex flex-col bg-white">
        <div className="flex justify-center items-center flex-col">
          <img
            src={paper}
            alt="Paper"
            className="w-full max-w-xs rounded-lg mb-4 animate-pulse"
          />
          <div className="mt-4 text-center">
            <span className="text-blue-700 font-semibold text-base block">
              {selectedPackage.price.toLocaleString()}đ
            </span>
            <span className="text-gray-500 line-through text-xs block">
              {selectedPackage.originalPrice.toLocaleString()}đ
            </span>
            <div className="mt-2 border-2 border-blue-700 rounded-lg p-1 bg-white inline-block">
              <span className="text-blue-700 text-xs">
                Giảm: {selectedPackage.discount}%
              </span>
            </div>
          </div>
        </div>

        <div className="font-semibold text-gray-700 mt-5">Gói mua</div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {packages.map((pkg) => (
            <button
              key={pkg.description}
              className={`${
                selectedPackage.description === pkg.description
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-black'
              } rounded-lg py-2 px-4 shadow-md hover:bg-blue-700 hover:text-white transition-all`}
              onClick={() => setSelectedPackage(pkg)}
            >
              <span className="font-semibold">{pkg.description}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="font-semibold text-gray-700">Số lượng</div>
          <div className="flex items-center space-x-2 pb-4">
            <button
              className="bg-white text-gray-700 rounded-lg px-4 py-2 border-2"
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              -
            </button>
            <span className="font-semibold text-gray-700">{quantity}</span>
            <button
              className="bg-white text-gray-700 rounded-lg px-4 py-2 border-2"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <button
          className="font-semibold text-base mb-5 w-full max-w-[200px] ml-auto bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 transition-all"
          onClick={addToCart}
        >
          Thêm vào giỏ hàng
        </button>
      </div>

      <div className="w-full md:w-1/2 shadow-lg rounded-lg p-6 bg-white p">
        <div className="p-2 flex bg-blue-100 rounded-lg space-x-1">
          <div className="font-semibold text-gray-700">Kho giấy:</div>
          <div className="font-semibold text-blue-600">{stock}</div>
        </div>

        <div className="font-semibold text-gray-700 mt-3 mb-2">Giỏ hàng</div>
        <div className="p-4 rounded-lg shadow-md bg-gray-100">
          {cart.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-gray-700 font-semibold py-2">Mô tả</th>
                  <th className="text-center text-gray-700 font-semibold py-2">Số lượng</th>
                  <th className="text-right text-gray-700 font-semibold py-2">Đơn giá</th>
                  <th className="text-right text-gray-700 font-semibold py-2">Thành tiền</th>
                  <th className="text-center text-gray-700 font-semibold py-2">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td className="text-gray-700">{item.description}</td>
                    <td className="text-center text-gray-700">{item.quantity}</td>
                    <td className="text-right text-gray-700">{item.price.toLocaleString()}đ</td>
                    <td className="text-right text-gray-700">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </td>
                    <td className="text-center">
                      <button
                        className=" text-white rounded-lg px-2 py-1 hover:bg-red-100 transition-all"
                        onClick={() => removeItemFromCart(index)}
                      >
                        <i className='pi pi-trash' style={{color: 'red'}}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-gray-700 font-semibold">Giỏ hàng trống</div>
          )}
        </div>

        <div className="mt-5 flex justify-between items-center">
          <div className="font-semibold text-gray-700">Tổng cộng:</div>
          <p className="font-semibold text-lg text-blue-600">
            {calculateTotal().toLocaleString()}đ
          </p>
        </div>

        <div className="w-full mt-5 flex justify-between space-x-4">
          <button
            className="bg-yellow-300 hover:bg-yellow-400 font-semibold ml-auto  text-white py-2 px-4 rounded-lg shadow-md  transition-all h-[36px] mr-5"
            onClick={() => navigate('/buy-paper-history')}
          >
            Xem lịch sử mua giấy in
          </button>
          <div style={{ borderLeft: '2px solid #000', height: '20px', margin: '10px' }}></div>
          <div className='flex items-center justify-end space-x-1'>
            <button
                className="font-semibold ml-auto bg-[#63B3ED] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#63B3EF] transition-all"
                onClick={() => console.log("Thanh toán sau")}
            >
                Thanh toán sau
            </button>
            <button
                className="font-semibold ml-auto bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 transition-all"
                onClick={checkout}
                disabled={cart.length === 0}
            >
                Thanh toán ngay
            </button>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default PaperShop;
