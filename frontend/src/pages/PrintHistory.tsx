import { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface DataType {
  key: React.Key;
  printerID: string;
  file: string;
  requestedTime: string;
  printedTime: string;
}

export default function PrintHistory() {
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePageSizeChange = (value: any) => {
    setPageSize(value);
  };

  const paginationOptions = {
    pageSize,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20'],
    onShowSizeChange: (_current: any, size: any) => handlePageSizeChange(size),
  };
  
  const columns = [
    {
      title: <span style={{ fontWeight: '600' }}>STT</span>,
      dataIndex: 'key',
    },
    {
      title: <span style={{ fontWeight: '600' }}>Máy in</span>,
      dataIndex: 'printerID',
    },
    {
      title: <span style={{ fontWeight: '600' }}>Số file</span>,
      dataIndex: 'file',
    },
    {
      title: <span style={{ fontWeight: '600' }}>Thời gian đăng ký in</span>,
      dataIndex: 'requestedTime',
    },
    {
      title: <span style={{ fontWeight: '600' }}>Thời gian in</span>,
      dataIndex: 'printedTime',
    },
    {
      title: <span style={{ fontWeight: '600' }}>Chi tiết</span>,
      render: (_: any, record: DataType) => (
        <Button type="link" onClick={() => showModal()}>
            <i className="fa-regular fa-circle-info"></i>
        </Button>
      ),
    },
  ];
  
  const dataSource = Array.from({ length: 30 }).map<DataType>((_, i) => ({
    key: i + 1,
    printerID: `Máy in Sony HP4 H6-11${i + 5}`,
    file: `Số file: ${i + 1}\nSố trang: ${10 + i}`,
    requestedTime: `10h00\n20/${10 + i}/2024`,
    printedTime: `10h30\n20/${10 + i}/2024`,
  }));
  
  return (
    <div className="">
      <div className="my-6 flex justify-between">
        <div className="relative mt-1 rounded-full bg-white px-4 py-2 shadow outline-none">
          {/* search */}
          <i className="fa-regular fa-magnifying-glass"></i>
            <input
                type="text"
                placeholder="Tìm kiếm"
                className="outline-none"
                // value={searchTerm}
                // onChange={handleSearch}
            />
        </div>
      </div> 
      <Table<DataType>
        className="rounded-lg border-[1px] shadow"
        columns={columns}
        dataSource={dataSource}
        pagination={paginationOptions}
        scroll={{ x: 500, y: 300 }}
        rowClassName="cursor-pointer"
      />
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
    
  );
}
