import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined, CheckOutlined, UploadOutlined, PrinterOutlined, SettingOutlined, FileOutlined, SmileOutlined, VerticalAlignTopOutlined, AlignCenterOutlined } from '@ant-design/icons';  // Cập nhật ở đây
import { Steps } from 'antd';
import papernormal from '../assets/papernormal.png'
import paperhori from '../assets/paperhori.png'

export default function PrintingConfiguration() {
  const navigate = useNavigate();
  
  // State để quản lý các thông số in
  const [numPages, setNumPages] = useState(1);
  const [numCopies, setNumCopies] = useState(1);
  const [paperSize, setPaperSize] = useState("A4");
  const [printSide, setPrintSide] = useState("1 mặt");
  const [colorMode, setColorMode] = useState("Màu");
  const [orientation, setOrientation] = useState("Dọc");

  // Các tùy chọn kích thước giấy
  const paperSizes = ["A4", "A3"];
  const orientations = ["Dọc", "Ngang"];

  const handleSubmit = () => {
    const printSettings = { numPages, numCopies, paperSize, printSide, orientation };
    navigate('/print-complete')
  };

  return (
    <div className="mt-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className='flex items-center justify-center mb-6'>
          <Steps
            current={1}
            className="space-x-8"
            items={[
              { title: 'Tải lên', status: 'finish', icon: <UploadOutlined /> },
              { title: 'Chọn máy in', status: 'finish', icon: <PrinterOutlined /> },
              { title: 'Tùy chỉnh thông số in', status: 'process', icon: <SettingOutlined /> },
              { title: 'Hoàn thành', status: 'wait', icon: <SmileOutlined /> },
            ]}
          />
        </div>
        <h2 className="text-center text-2xl font-bold mb-6">Tùy chỉnh thông số in</h2>

        {/* Số trang và Số bản sao (2 input 1 dòng) */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="numPages" className="block text-lg font-semibold mb-2">Số trang:</label>
            <input 
              id="numPages"
              type="number"
              min={1}
              max={1000}
              value={numPages}
              onChange={(e) => setNumPages(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập số trang"
            />
          </div>

          <div>
            <label htmlFor="numCopies" className="block text-lg font-semibold mb-2">Số bản sao:</label>
            <input 
              id="numCopies"
              type="number"
              min={1}
              max={100}
              value={numCopies}
              onChange={(e) => setNumCopies(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập số bản sao"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-4">
                <label htmlFor="paperSize" className="block text-lg font-semibold mb-2">Kích thước giấy:</label>
                <select
                    id="paperSize"
                    value={paperSize}
                    onChange={(e) => setPaperSize(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {paperSizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </div>

                    {/* Chọn mặt in */}
            <div className="mb-4">
                <label htmlFor="printSide" className="block text-lg font-semibold mb-2">Mặt in:</label>
                <select
                    id="printSide"
                    value={printSide}
                    onChange={(e) => setPrintSide(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="1 mặt">1 mặt</option>
                    <option value="2 mặt">2 mặt</option>
                </select>
            </div>
        </div>


        {/* Chế độ dọc hay ngang với icon */}
        <div className="mb-6">
          <label htmlFor="orientation" className="block text-lg font-semibold mb-2">Chế độ in:</label>
          <div className="flex items-center space-x-4">
            <div 
              onClick={() => setOrientation("Dọc")}
              className={`p-3 rounded-lg cursor-pointer border-2 ${orientation === "Dọc" ? 'border-blue-500' : 'border-gray-300'} hover:bg-gray-100`}
            >
              <img src={papernormal} className='size-16'/>
            </div>
            <div 
              onClick={() => setOrientation("Ngang")}
              className={`p-3 rounded-lg cursor-pointer border-2 ${orientation === "Ngang" ? 'border-blue-500' : 'border-gray-300'} hover:bg-gray-100`}
            >
              <img src={paperhori} className='size-16'/>
            </div>
          </div>
        </div>

        {/* Button Quay lại và Xác nhận */}
        <div className="flex justify-between">
          <button 
            onClick={() => navigate('/choose-printer')}
            className="w-32 px-4 py-2 bg-gray-300 text-black rounded-md flex items-center justify-center hover:bg-gray-400 transition"
          >
            <LeftOutlined className="mr-2" /> Quay lại
          </button>
          <button 
            onClick={handleSubmit}
            className="w-32 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition"
          >
            <CheckOutlined className="mr-2" /> Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
