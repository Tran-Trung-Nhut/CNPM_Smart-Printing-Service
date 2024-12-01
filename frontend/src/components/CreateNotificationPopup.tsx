import axios from "axios";
import { useEffect, useState } from "react";
import { UserDto } from "../dtos/User.dto";

export default function CreateNotificationPopup({
    onClose,
    fetchNotifications, // Nhận hàm fetchPrinters từ props
  }: {
    onClose: () => void;
    fetchNotifications: () => void;
  }) {
    const [recipient, setRecipient] = useState<string[]>([]); // List of selected recipients
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [students, setStudents] = useState<UserDto[]>([]);

    // Fetch student list
    const fetchRecipient = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/users?role=student');
            setStudents(response.data.data); 
        } catch (error) {
            setStudents([]);
        }
    };

    useEffect(() => {
        fetchRecipient();
    }, []); 

    // Handle create notification
    const handleCreate = async () => {
        if (!title || !content || !recipient) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            if(recipient[0] === 'All') {
                const response = await axios.post('http://localhost:3000/api/v1/notifications/sendToAll',{
                    title,
                    content
                })

                if(response.data.status === 201){
                    fetchNotifications()

                    alert("Gửi thông báo thành công!")
                }
            }else {
                for(const rec of recipient){
                    const response = await axios.post('http://localhost:3000/api/v1/notifications/send',{
                        user_ID: Number(rec),
                        title,
                        content
                    })

                    console.log(Number(rec),
                    title,
                    content)

                    console.log(response)
                }
                fetchNotifications()
                alert("Gửi thông báo thành công!")
            }
        } catch (error) {
            alert("Không thể tạo thông báo ngay lúc này! Vui lòng thử lại sau!");
        }

        onClose();
    };

    // Handle recipient change (checkbox selection)
    const handleRecipientChange = (event: React.ChangeEvent<HTMLInputElement>, userId: string) => {
        if (event.target.checked) {
            setRecipient((prev) => [...prev, userId]);
        } else {
            setRecipient((prev) => prev.filter((id) => id !== userId));
        }
    };

    // Handle the "Select All" checkbox
    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setRecipient(["All"]);
        } else {
            setRecipient([]);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="bg-gradient-to-br from-white via-blue-50 to-gray-100 p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg space-y-6 mt-40 mb-10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center space-y-2">
                    <div className="text-blue-600 bg-blue-100 p-4 rounded-full shadow-lg">
                        <i className="pi pi-bell text-3xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Tạo Thông Báo Mới</h3>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Người nhận</label>
                        <div className="space-y-2">
                            {/* Select All Checkbox */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="selectAll"
                                    onChange={handleSelectAll}
                                    checked={recipient.length === students.length}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label htmlFor="selectAll" className="text-sm text-gray-700">Chọn tất cả</label>
                            </div>

                            {/* Scrollable List of Checkboxes */}
                            <div className="overflow-y-auto max-h-60 p-2 border border-gray-300 rounded-lg" style={{ maxHeight: "250px" }}>
                                {students.map((student) => (
                                    <div key={student.user_ID} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`recipient-${student.user_ID}`}
                                            value={student.user_ID}
                                            checked={recipient.includes(student.user_ID.toString())}
                                            onChange={(e) => handleRecipientChange(e, student.user_ID.toString())}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        />
                                        <label htmlFor={`recipient-${student.user_ID}`} className="text-sm text-gray-700">
                                            {`${student.name} - ${student.user_ID}`}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                        <input
                            type="text"
                            className="block w-full rounded-lg border border-gray-300 shadow-md focus:ring-blue-400 focus:border-blue-400 p-2 bg-white placeholder-gray-400"
                            placeholder="Nhập tiêu đề thông báo"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                        <textarea
                            className="block w-full rounded-lg border border-gray-300 shadow-md focus:ring-blue-400 focus:border-blue-400 p-2 bg-white placeholder-gray-400"
                            rows={4}
                            placeholder="Nhập nội dung thông báo"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-200 shadow-md"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-md"
                    >
                        Tạo
                    </button>
                </div>
            </div>
        </div>
    );
}
