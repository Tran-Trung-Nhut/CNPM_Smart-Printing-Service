import MainLayout from "../components/MainLayout";
import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { UploadProps, Steps, Button } from "antd";
import { message, Upload } from "antd";
import { SmileOutlined, PrinterOutlined, UploadOutlined } from '@ant-design/icons';
import "../pages/PrintUpload.css";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
  maxCount: 1,
};

const PrintUpload: React.FC = () => (
  <MainLayout>
    <Steps
    items={[
      {
        title: 'Upload',
        status: 'process',
        icon: <UploadOutlined />,
      },
      {
        title: 'Print Preview',
        status: 'wait',
        icon: <PrinterOutlined />,
      },
      {
        title: 'Done',
        status: 'wait',
        icon: <SmileOutlined />,
      },
    ]}
    />
    <div className="flex flex-col p-10">
      <div className="">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Drop your printable document here (PDF, Word, etc.). Single file upload only
          </p>
        </Dragger>
      </div>
    </div>
    <Button type="primary">In tài liệu</Button>
  </MainLayout>
);

export default PrintUpload;