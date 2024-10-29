import { useState } from "react";
import Modal from "react-modal";

interface SelectRecieverProps{
    isOpen: boolean
    setIsOpen: (val: boolean) => void
}

const data = [
    { name: "John Doe", student_ID: "ds3a23", printing_time: 35, pages: 5 },
    { name: "Jane Smith", student_ID: "ds3b45", printing_time: 15, pages: 2 },
    { name: "Alice Johnson", student_ID: "ds3c67", printing_time: 20, pages: 3 },
    { name: "Michael Brown", student_ID: "ds3d89", printing_time: 50, pages: 10 },
]

export default function SelectReciever({isOpen, setIsOpen}: SelectRecieverProps) {
    const [selectAll, setSelectAll] = useState<boolean>(false)

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
      };

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "500px",
          },
        }}
      >
        <p className="text-2xl font-mono font-bold mb-4 text-center border-b-2">
          Chọn người nhận
        </p>
        <div className="flex justify-between space-x-2 border-b-2 pb-2">
          <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                className="size-4 "
                checked={selectAll}
                onChange={handleSelectAll}
            />
            <p className="font-bold">Chọn tất cả</p>
          </div>
          <div className="flex items-center space-x-1">
            <input
            type="text"
            className="border-2 rounded h-8 w-56"
            placeholder="Nhập tên hoặc MSSV"
            />
            <i className="pi pi-search" style={{color: 'gray'}}/>
          </div>
          <button
            className="border-2 px-2 py-1 rounded flex justify-center items-center space-x-2 hover:bg-blue-300 hover:scale-110 active:scale-95"
            onClick={() => setIsOpen(false)} // Xác nhận chọn sinh viên
          >
            <i className="pi pi-check"/>
            <p className="font-bold">Xác nhận</p>
          </button>
        </div>
        <div className="overflow-auto h-[200px]">
          {data.map((student) => (
            <div key={student.name} className="flex items-center mb-2 font-mono border-b-[1px] py-1">
              <input
                type="checkbox"
                className="size-4"
                checked={selectAll? true : false}
              />
              <p className="ml-3">{student.name}</p>
            </div>
          ))}
        </div>
      </Modal>
    )
}