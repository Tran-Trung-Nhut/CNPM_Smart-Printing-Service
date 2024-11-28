import React, { useEffect } from 'react';
import { Result, Button, Steps } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, PrinterOutlined, SettingOutlined, SmileOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { documentState, isPrintingSuccessState } from '../state';

export default function PrintingComplete() {
  const navigate = useNavigate();
  const isSuccess = useRecoilValue(isPrintingSuccessState);
  const setDocument = useSetRecoilState(documentState)

  useEffect(() => {
    // You can perform some side effect or tracking here if needed
  }, [isSuccess]);

  return (
    <div className="w-2/3 mx-auto mt-10 px-6 py-8 bg-white shadow-lg rounded-lg">
      {/* Cập nhật Steps */}
      <Steps
        current={3} // Cập nhật trạng thái hoàn thành
        className="space-x-8 mb-8"
        items={[
          { title: 'Tải lên', status: 'finish', icon: <UploadOutlined /> },
          { title: 'Chọn máy in', status: 'finish', icon: <PrinterOutlined /> },
          { title: 'Tùy chỉnh thông số in', status: 'finish', icon: <SettingOutlined /> },
          { title: 'Hoàn thành', status: 'process', icon: <SmileOutlined /> },
        ]}
      />
      
      {/* Kết quả thành công hoặc thất bại */}
      {isSuccess ? (
        <Result
          status="success"
          title="Đăng ký in thành công!"
          subTitle="Hệ thống đã nhận yêu cầu của bạn. Hãy theo dõi thông báo sau khi in hoàn tất."
          icon={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: '80px' }} />}
          extra={[
            <Button
              key="home"
              type="primary"
              onClick={() => {
                setDocument([])
                navigate('/')
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Quay lại trang chủ
            </Button>,
          ]}
        />
      ) : (
        <Result
          status="error"
          title="Đăng ký in thất bại!"
          subTitle="Có lỗi xảy ra trong quá trình đăng ký in. Vui lòng kiểm tra lại và thử lại."
          icon={<CloseCircleOutlined style={{ color: '#f5222d', fontSize: '80px' }} />}
          extra={[
            <Button
              key="retry"
              type="primary"
              onClick={() => navigate('/print-config')}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Thử lại
            </Button>,
          ]}
        />
      )}
    </div>
  );
}
