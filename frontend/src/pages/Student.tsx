import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import StudentInformationPopup from "../components/StudentInformationPopup";
import axios from "axios";
import { StudentDto } from "../dtos/Student.dto";


export default function Student() {
    const [isShowInformation, setIsShowInformation] = useState<boolean>(false);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [student, setStudent] = useState<StudentDto[]>([])

    const totalPages = Math.ceil(student.length / rowsPerPage);
    const currentData = student.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to the first page when rows per page changes
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/users?role=student'); 
            setStudent(response.data.data);
        } catch (error) {
            alert('Get printer false!')
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    return (
        <div className="overflow-x-auto shadow-xl rounded flex flex-col justify-between items-center min-h-screen bg-white mt-5 mx-5">
            {isShowInformation && (
                <StudentInformationPopup onClose={() => setIsShowInformation(false)} />
            )}

            <div className="w-full">
                <div className="bg-[#C6DCFE] flex items-center space-x-1">
                    <div className="pl-2 py-2 rounded">
                        <input
                            placeholder="Nhập họ và tên hoặc MSSV"
                            className="w-64 pl-1 rounded placeholder:italic"
                        />
                    </div>
                    <i className="pi pi-search" />
                </div>
                <table className="table-auto w-full bg-white">
                    <thead className="bg-[#C6DCFE]">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Họ và tên</th>
                            <th className="px-4 py-2">MSSV</th>
                            <th className="px-4 py-2">Tổng số lần in</th>
                            <th className="px-4 py-2">Số trang còn lại</th>
                            <th className="px-4 py-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((data, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "" : "bg-gray-100"}
                            >
                                <td className="px-4 py-2 text-center">
                                    {(currentPage - 1) * rowsPerPage + index + 1}
                                </td>
                                <td className="px-4 py-2 text-center">{data.name}</td>
                                <td className="px-4 py-2 text-center">{data.user_ID}</td>
                                <td className="px-4 py-2 text-center">{0}</td>
                                <td className="px-4 py-2 text-center">{data.pageBalance}</td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        type="button"
                                        className="text-gray-400"
                                        onClick={() => setIsShowInformation(true)}
                                    >
                                        <i className="pi pi-info-circle"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-[#C6DCFE] h-12 flex items-center justify-between w-full rounded px-4">
                <div className="flex justify-center items-center space-x-2">
                    <p className="pl-2">Tổng số hàng: {student.length}</p>
                    <div className="border-x-2 border-black"></div>
                    <div className="flex items-center space-x-2">
                    <label htmlFor="rows-per-page" className="text-sm">
                        Số hàng mỗi trang:
                    </label>
                    <select
                        id="rows-per-page"
                        className="rounded border-gray-300 p-1"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        className="px-2 py-1 border rounded bg-slate-300"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Trước
                    </button>
                    <span className="text-sm">
                        Trang {currentPage}/{totalPages}
                    </span>
                    <button
                        className="px-2 py-1 border rounded bg-slate-300"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Sau
                    </button>
                </div>
            </div>
        </div>
    );
}

