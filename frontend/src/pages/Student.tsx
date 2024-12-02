import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import StudentInformationPopup from "../components/StudentInformationPopup";
import axios from "axios";
import { defaultStudentShowDto, StudentDto, StudentShowDto } from "../dtos/Student.dto";
import { defaultPrintConfigurationDto, PrintConfigurationDto } from "../dtos/PrintConfiguration.dto";
import PrintConfigInformation from "../components/PrintConfigInformationPopupSPSO";
import AddPaperPopup from "../components/SemeterPaperPopup";
import AddPaperHistoryPopup from "../components/AddPaperHistoryPopup";
export default function Student() {
    const [isShowInformation, setIsShowInformation] = useState<boolean>(false);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [student, setStudent] = useState<StudentDto[]>([]);
    const [userNumOfPrint, setUserNumOfPrint] = useState<{ [key: number]: number }>({}); 
    const [selectStudent, setSelectStudent] = useState<StudentShowDto>(defaultStudentShowDto);
    const [selectedPrintConfig, setSelectedPrintConfig] = useState<PrintConfigurationDto>(defaultPrintConfigurationDto);
    const [isShowPrintConfig, setIsShowPrintConfig] = useState<boolean>(false);
    const [isShowSemeterPaper, setIsShowSemeterPaper] = useState<boolean>(false);
    const [isShowHistoryPaper, setIsShowHistoryPaper] = useState<boolean>(false);



    const totalPages = Math.ceil(student.length / rowsPerPage);
    const currentData = student.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1); 
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
            await updatePrintCounts(response.data.data); 
        } catch (error) {
            setStudent([])
        }
    };

    const getNumberOfPrinting = async (user_ID: number): Promise<number> => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/printconfig?user_ID=${user_ID}`);
            if (response.data && response.data.data) {
                return response.data.data.length;
            } else {
                return 0;
            }
        } catch (error) {
            return 0; 
        }
    };

    const updatePrintCounts = async (students: StudentDto[]) => {
        const newUserNumOfPrint: { [key: number]: number } = {};
        await Promise.all(
            students.map(async (student) => {
                const printCount = await getNumberOfPrinting(student.user_ID);
                newUserNumOfPrint[student.user_ID] = printCount;
            })
        );
        setUserNumOfPrint(newUserNumOfPrint); 
    };

    useEffect(() => {
        fetchStudents(); 
    }, []);

    return (
        <div className="overflow-x-auto shadow-xl rounded flex flex-col justify-between items-center min-h-screen bg-white mt-5 mx-5">
            {isShowInformation && (
                <StudentInformationPopup 
                student={selectStudent}
                onClose={() => setIsShowInformation(false) }
                setPrintConfig={(value) => setSelectedPrintConfig(value)}
                showPrintConfig={(value) => setIsShowPrintConfig(value)}
                />
            )}

            {isShowPrintConfig && (
                <PrintConfigInformation
                onClose={() => setIsShowPrintConfig(false)}
                config={selectedPrintConfig}
                type="student"
                />
            )}

            {isShowSemeterPaper && (
                <AddPaperPopup
                onClose={() => setIsShowSemeterPaper(false)}
                />
            )}

            {isShowHistoryPaper && (
                <AddPaperHistoryPopup
                onClose={() => setIsShowHistoryPaper(false)}
                />
            )}  

            <div className="w-full">
                <div className="bg-[#C6DCFE] flex items-center justify-between py-2 px-4 rounded">
                    <div className="flex items-center space-x-2">
                        <input
                            placeholder="Nhập họ và tên hoặc MSSV"
                            className="w-64 pl-1 rounded placeholder:italic"
                        />
                        <i className="pi pi-search" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsShowHistoryPaper(true)}
                            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-green-600 hover:to-green-700 focus:outline-none"
                        >
                            Lịch sử thêm giấy
                        </button>
                        <button
                            onClick={() => setIsShowSemeterPaper(true)}
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none"
                        >
                            Thêm giấy định kỳ
                        </button>
                    </div>
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
                                <td className="px-4 py-3 text-center">{data.name}</td>
                                <td className="px-4 py-3 text-center">{data.user_ID}</td>
                                <td className="px-4 py-3 text-center">
                                    {userNumOfPrint[data.user_ID] !== undefined ? userNumOfPrint[data.user_ID] : 0}
                                </td>
                                <td className="px-4 py-3 text-center">{data.pageBalance}</td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        type="button"
                                        className="text-gray-400"
                                        onClick={() => {
                                            setSelectStudent({
                                                email: data.email,
                                                name: data.name,
                                                pageBalance: data.pageBalance,
                                                password:  '',
                                                role: data.role,
                                                user_ID: data.user_ID,
                                                numOfPrint: userNumOfPrint[data.user_ID]
                                            })
                                            setIsShowInformation(true)
                                        }}
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

