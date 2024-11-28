import React from "react";
import { InboxOutlined, UploadOutlined, SmileOutlined, PrinterOutlined, SettingOutlined, FileOutlined } from '@ant-design/icons';
import { Upload, Button, message, Steps } from "antd";
import Dragger from "antd/es/upload";
import { useNavigate } from "react-router-dom";

const props = {
  name: 'file',
  multiple: false,  // Chỉ cho phép upload 1 file
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info: any) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: any) {
    console.log('Dropped files', e.dataTransfer.files);
  },
  maxCount: 1,  // Chỉ cho phép upload tối đa 1 file
};

const PrintUpload: React.FC = () => {

  const navigate = useNavigate()

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-white shadow-lg rounded-lg mt-5 mx-40">
      <div className="flex flex-col items-center w-full p-6">
        
        {/* Đoạn Steps với khoảng cách rộng hơn */}
        <Steps
          current={0}
          className="space-x-8 w-full p-b"
          style={{ display: 'flex', justifyContent: 'space-between' }}
          items={[
            { title: 'Tải lên', status: 'process', icon: <UploadOutlined /> },
            { title: 'Chọn máy in', status: 'wait', icon: <PrinterOutlined /> },
            { title: 'Tùy chỉnh thông số in', status: 'wait', icon: <SettingOutlined /> },
            { title: 'Xem trước khi in', status: 'wait', icon: <FileOutlined /> },
            { title: 'Hoàn thành', status: 'wait', icon: <SmileOutlined /> },
          ]}
        />
        
        {/* Khu vực Drag & Drop */}
        <div className="w-[64%] border-y border-gray-200 my-8"></div>

        <div className="my-6 flex justify-center w-full">
          <Dragger {...props} className="border-2 border-dashed border-blue-500 p-8 rounded-lg hover:border-blue-700">
            <p className="ant-upload-drag-icon text-4xl text-blue-500">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text text-xl text-center text-gray-800">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint text-center text-gray-500">
              Drop your printable document here (PDF, Word, etc.). Single file upload only.
            </p>
          </Dragger>
        </div>

        <div className="w-[64%] border-y border-gray-200 my-8"></div>

        {/* Nút In tài liệu */}
        <Button 
        type="primary" 
        style={{ width: '64%' }} 
        className="font-bold text-xl h-10"
        onClick={() => navigate('/choose-printer')}>
          Chọn máy in
        </Button>
      </div>
    </div>
  );
};

export default PrintUpload;
