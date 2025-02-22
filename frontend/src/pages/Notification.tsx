import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import NotificationInformationPopup from "../components/NotificationInformationPopup";
import CreateNotificationPopup from "../components/CreateNotificationPopup";
import { defaultNotification, NotificationDto } from "../dtos/Notification.dto";
import axios from "axios";




export default function Notification() {
    const [isShowInformation, setIsShowInformation] = useState<boolean>(false);
    const [isShowCreate, setIsShowCreate] = useState<boolean>(false)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedNotification, setSelectedNotification] = useState<NotificationDto>(defaultNotification)
    const [notification, setNotification] = useState<NotificationDto[]>([])

    const totalPages = Math.ceil(notification.length / rowsPerPage);
    const currentData = notification.slice(
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

    const handleShowInformation = (notification: NotificationDto) => {
        setSelectedNotification(notification)
        setIsShowInformation(true)
    }

    const handleDelete = async (notification_ID: number) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa thông báo này?")

        if(!confirm) return

        try{
            const response = await axios.delete(`http://localhost:3000/api/v1/notifications/${notification_ID}`)

            fetchNotifications()
            alert("Xóa thông báo thành công!")
        }catch(e){
            alert("Không thể xóa thông báo trong lúc này! Vui lòng thử lại sau!")
        }
    }

    const fetchNotifications = async () => {
        try{
            const response = await axios.get('http://localhost:3000/api/v1/notifications')

            setNotification(response.data.data)
        }catch(e){
            setNotification([])
        }
    }

    useEffect(() => {
        fetchNotifications()
    },[])

    return (
        <div className="overflow-x-auto shadow-xl rounded flex flex-col justify-between items-center min-h-screen bg-white mt-5 mx-5">
            {isShowInformation && (
                <NotificationInformationPopup 
                onClose={() => setIsShowInformation(false)} 
                title={selectedNotification.title}
                content={selectedNotification.content}
                createDate={selectedNotification.createDate}
                updateDate={selectedNotification.updateDate}/>
            )}

            {isShowCreate && (<CreateNotificationPopup 
            onClose={() => setIsShowCreate(false)}
            fetchNotifications={() => fetchNotifications()}
            />
            )}

            <div className="w-full">
            <div className="bg-[#C6DCFE] flex items-center justify-between space-x-1 px-4 py-2">
                <div className="flex items-center space-x-2">
                    <input
                        placeholder="Nhập nội dung tìm kiếm"
                        className="w-64 pl-1 rounded placeholder:italic"
                    />
                    <i className="pi pi-search mr-1"></i>
                </div>

                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 active:scale-90"
                    onClick={() => setIsShowCreate(true)} 
                >
                    <i className="pi pi-bell mr-2"></i> Tạo thông báo mới
                </button>
            </div>

                <table className="table-auto w-full bg-white">
                    <thead className="bg-[#C6DCFE]">
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Tiêu đề</th>
                            <th className="px-4 py-2">Ngày tạo</th>
                            <th className="px-4 py-2">Ngày chỉnh sửa</th>
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
                                <td className="px-4 py-2 text-center">{data.title}</td>
                                <td className="px-4 py-2 text-center">
                                    {new Date(data.createDate).toString() !== 'Invalid Date' ?
                                        new Intl.DateTimeFormat('vi-VN', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric', 
                                        hour: 'numeric', 
                                        minute: 'numeric', 
                                        second: 'numeric'
                                        }).format(new Date(data.createDate)) : 'Ngày không hợp lệ'}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                    {new Date(data.createDate).toString() !== 'Invalid Date' ?
                                        new Intl.DateTimeFormat('vi-VN', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric', 
                                        hour: 'numeric', 
                                        minute: 'numeric', 
                                        second: 'numeric'
                                        }).format(new Date(data.updateDate)) : 'Ngày không hợp lệ'}
                                    </td>
                                <td className="px-4 py-2 text-center flex space-x-3 justify-center">
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:scale-110 active:scale-90"
                                        onClick={() => handleShowInformation(data)}
                                    >
                                        <i className="pi pi-info-circle"/>
                                    </button>

                                    <button
                                        type="button"
                                        className="text-gray-400 hover:scale-110 active:scale-90"
                                        onClick={() => handleDelete(data.notification_ID)}
                                    >
                                        <i className="pi pi-trash" style={{color: 'red'}}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-[#C6DCFE] h-12 flex items-center justify-between w-full rounded px-4">
                <div className="flex justify-center items-center space-x-2">
                    <p className="pl-2">Tổng số hàng: {notification.length}</p>
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

