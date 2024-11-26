import "primeicons/primeicons.css";
import { useState } from "react";
import PrinterInformationPopup from "../components/PrinterInformationPopup";

interface Student {
    brand: string,
    ID: string,
    location: string,
    status: string,
}

const datas = Array.from({ length: 30 }).map<Student>((_, i) => ({
    brand: `Dell`,
    ID: `${i}`,
    location: `H1-CS${i % 2 === 0? 2 : 1}`,
    status:  `${i % 2 === 0? 'Hoạt động' : 'Bảo trì'}`,
}));

export default function Printer() {
    const [isShowInformation, setIsShowInformation] = useState<boolean>(false)
    return (
        <div className="overflow-x-auto shadow-xl rounded flex flex-col justify-between items-center min-h-screen bg-white mt-5 mx-5">
            {isShowInformation && (
                <PrinterInformationPopup onClose={() => setIsShowInformation(false)}/>
            )}
            
            <div className="w-full">
                <div className="bg-[#C6DCFE] flex items-center space-x-1">
                    <div className="pl-2 py-2 rounded">
                        <input placeholder="Nhập họ và tên hoặc MSSV" className="w-64 pl-1 rounded placeholder:italic"/>
                    </div>
                    <i className="pi pi-search"/>
                </div>
                <table className="table-auto w-full bg-white">
                    <thead className="bg-[#C6DCFE]">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Hãng máy in</th>
                            <th className="px-4 py-2">Mã số máy in</th>
                            <th className="px-4 py-2">Vị trí</th>
                            <th className="px-4 py-2">Tình trạng</th>
                            <th className="px-4 py-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {datas.map((data, index) => (
                            <tr key={index} className={index % 2 === 0 ? "" : "bg-gray-100"}>
                                <td className="px-4 py-2 text-center">{index + 1}</td>
                                <td className="px-4 py-2 text-center">{data.brand}</td>
                                <td className="px-4 py-2 text-center">{data.ID}</td>
                                <td className="px-4 py-2 text-center">{data.location}</td>
                                <td className="px-4 py-2 text-center">{data.status}</td>
                                <td className="px-4 py-2 text-center">
                                    <button 
                                    type="button"
                                    className="text-gray-400"
                                    onClick={() => setIsShowInformation(true)}>
                                        <i className="pi pi-info-circle"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-[#C6DCFE] h-12 flex items-center justify-start w-full rounded">
                <p className="pl-2">Tổng số trang: {datas.length}</p>
            </div>
        </div>
    );
}