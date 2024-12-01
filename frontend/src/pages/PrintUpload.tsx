import React, { useEffect, useState } from "react";
import { InboxOutlined, UploadOutlined, SmileOutlined, PrinterOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, message, Steps, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DocumentDto } from "../dtos/File.dto";
import { documentState, errorState } from "../state";

const PrintUpload: React.FC = () => {
  const navigate = useNavigate();
  const setError = useSetRecoilState(errorState)
  const [file, setFile] = useRecoilState(documentState);

  const handleChoosePrinter = () => {
    if(file.length === 0) alert("Vui lòng tải tệp cần in trước khi đến bước tiếp theo!")
    if(file.length > 0) navigate('/choose-printer')
  }

  const customRequest = (options: any) => {
    const { file, onSuccess } = options;

  
    setTimeout(() => {
      onSuccess("ok"); 
      message.success(`${file.name} đã được tải lên thành công.`);

      const formattedLastModifiedDate = new Date(file.lastModifiedDate).toISOString().slice(0, 19).replace('T', ' ');

      const fileDetails = {
        name: file.name,
        size: file.size,
        lastModifiedDate: formattedLastModifiedDate, 
      };

      setFile((prev) => [...prev, fileDetails]);
    }, 1000); 
  };

  useEffect(() => {
    setError('')
  }, [])

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-white shadow-lg rounded-lg mt-5 mx-40">
      <div className="flex flex-col items-center w-full p-6">
        
        <Steps
          current={0}
          className="space-x-8 w-full p-b"
          style={{ display: 'flex', justifyContent: 'space-between' }}
          items={[
            { title: 'Tải lên', status: 'process', icon: <UploadOutlined /> },
            { title: 'Chọn máy in', status: 'wait', icon: <PrinterOutlined /> },
            { title: 'Tùy chỉnh thông số in', status: 'wait', icon: <SettingOutlined /> },
            { title: 'Hoàn thành', status: 'wait', icon: <SmileOutlined /> },
          ]}
        />
        
        <div className="w-[64%] border-y border-gray-200 my-8"></div>

        <div className="my-6 flex justify-center w-full">
          <Upload
            multiple={true}
            customRequest={customRequest} 
            showUploadList={true} 
            maxCount={10}
            className="border-2 border-dashed border-blue-500 p-8 rounded-lg hover:border-blue-700"
          >
            <div className="ant-upload-drag-icon text-4xl text-blue-500">
              <InboxOutlined />
            </div>
            <p className="ant-upload-text text-xl text-center text-gray-800">
              Chọn tệp hoặc kéo thả tệp vào đây để tải lên
            </p>
            <p className="ant-upload-hint text-center text-gray-500">
              Thả các tệp có thể in và đây (PDF, Word, etc.).
            </p>
          </Upload>
        </div>

        <div className="w-[64%] border-y border-gray-200 my-8"></div>

        <Button 
          type="primary" 
          style={{ width: '64%' }} 
          className="font-bold text-xl h-10"
          onClick={() => handleChoosePrinter()}
        >
          Chọn máy in
        </Button>    
      </div>
    </div>
  );
};

export default PrintUpload;
