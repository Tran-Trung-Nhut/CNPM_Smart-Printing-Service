import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined, CheckOutlined, UploadOutlined, PrinterOutlined, SettingOutlined, FileOutlined, SmileOutlined, VerticalAlignTopOutlined, AlignCenterOutlined } from '@ant-design/icons';  // Cập nhật ở đây
import { Steps } from 'antd';
import papernormal from '../assets/papernormal.png'
import paperhori from '../assets/paperhori.png'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { documentState, errorState, isPrintingSuccessState, numCopiesState, numPagesState, orientationState, paperSizeState, printerIDState, printSideState, userState } from '../state';
import axios from 'axios';
import { defaultLoginUser, defaultUser, UserDto } from '../dtos/User.dto';

export default function PrintingConfiguration() {
  const navigate = useNavigate();
  
  const [numPages, setNumPages] = useRecoilState(numPagesState);
  const [numCopies, setNumCopies] = useRecoilState(numCopiesState);
  const [paperSize, setPaperSize] = useRecoilState(paperSizeState);
  const [printSide, setPrintSide] = useRecoilState(printSideState);
  const [orientation, setOrientation] = useRecoilState(orientationState);
  const [userData, setUserData] = useState<UserDto>(defaultUser)
  const printer_ID = useRecoilValue(printerIDState)
  const documents = useRecoilValue(documentState)
  const user = useRecoilValue(userState)
  const setIsPrintingSuccess = useSetRecoilState(isPrintingSuccessState)
  const setError = useSetRecoilState(errorState)

  const paperSizes = ["A4", "A3"];

  const getNumberOfPageForPrint  = async () : Promise<number> => {
    if(printSide === 'single-sided'){
      return numPages * numCopies
    }else if(numPages === 1 || numPages === 2){
      return numCopies
    }else if(numPages % 2 === 0){
      return (numPages / 2) * numCopies
    } else return (numPages / 2 + 1) * numCopies
  }

  const handleSubmit = async () => {
    
    try{
      const res = await axios.get(`http://localhost:3000/api/v1/users/${user.user_ID}`)

      // setUserData(res.data.data)

      const numberNeededPages = await getNumberOfPageForPrint()

      if(res.data.data.pageBalance < numberNeededPages) {
        console.log(userData)
        setIsPrintingSuccess(false)
        setError('Số trang còn lại của bạn không đủ. Vui lòng mua thêm trang in!')
        navigate('/print-complete')
        return
      } else{

        const response = await axios.post('http://localhost:3000/api/v1/printconfig',{
          user_ID: user.user_ID,
          printer_ID,
          numPages,
          numCopies,
          paperSize,
          printSide,
          orientation
        })
  
        console.log(response.data.data.config_ID)
  
        if(response.data.status === 200) {
          const config_ID = response.data.data.config_ID
          for(const document of documents){
            const responseDocument = await axios.post('http://localhost:3000/api/v1/document',{
              config_ID,
              name: document.name,
              size: document.size,
              lastModifiedDate: document.lastModifiedDate
            })
  
            console.log(responseDocument)
          }
        
          setIsPrintingSuccess(true)

          await axios.put(`http://localhost:3000/api/v1/users/${user.user_ID}`,{
            user_ID: res.data.data.user_ID,
            email: res.data.data.email,
            password: res.data.data.password,
            name: res.data.data.name,
            role: res.data.data.role,
            pageBalance: res.data.data.pageBalance - numberNeededPages
            
          })

          navigate('/print-complete')
        }
      }
      
    }catch(e){
      console.log(e)
      setIsPrintingSuccess(false)
      navigate('/print-complete')
    }
  };

  useEffect(() => {
    console.log(documents)
  }, [])

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

            <div className="mb-4">
                <label htmlFor="printSide" className="block text-lg font-semibold mb-2">Mặt in:</label>
                <select
                    id="printSide"
                    value={printSide}
                    onChange={(e) => setPrintSide(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="single-sided">1 mặt</option>
                    <option value="double-sided">2 mặt</option>
                </select>
            </div>
        </div>

        <div className="mb-6">
          <label htmlFor="orientation" className="block text-lg font-semibold mb-2">Chế độ in:</label>
          <div className="flex items-center space-x-4">
            <div 
              onClick={() => setOrientation("portrait")}
              className={`p-3 rounded-lg cursor-pointer border-2 ${orientation === "portrait" ? 'border-blue-500' : 'border-gray-300'} hover:bg-gray-100`}
            >
              <img src={papernormal} className='size-16'/>
            </div>
            <div 
              onClick={() => setOrientation("landscape")}
              className={`p-3 rounded-lg cursor-pointer border-2 ${orientation === "landscape" ? 'border-blue-500' : 'border-gray-300'} hover:bg-gray-100`}
            >
              <img src={paperhori} className='size-16'/>
            </div>
          </div>
        </div>

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
