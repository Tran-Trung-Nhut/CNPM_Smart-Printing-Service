export default function NotificationInformationPopup({
    onClose,
    title,
    content,
    createDate,
    updateDate,
}: {
    onClose: () => void;
    title: string;
    content: string;
    createDate: Date;
    updateDate: Date;
}) {
    // Hàm kiểm tra xem đối tượng Date có hợp lệ không
    const formatDate = (date: any) => {
        const parsedDate = new Date(date);
        if (parsedDate.toString() === 'Invalid Date') {
            return 'Ngày không hợp lệ';
        }
        return new Intl.DateTimeFormat("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        }).format(parsedDate);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-xl text-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="text-xl font-bold text-blue-600">
                        Thông tin thông báo
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 transition duration-200"
                    >
                        <i className="pi pi-times text-2xl"></i>
                    </button>
                </div>

                {/* Body */}
                <div className="mt-4 space-y-4">
                    <div className="text-left">
                        <h4 className="text-lg font-semibold">Tiêu đề:</h4>
                        <p className="text-gray-700">{title}</p>
                    </div>
                    <div className="text-left">
                        <h4 className="text-lg font-semibold">Nội dung:</h4>
                        <div className="text-gray-700 whitespace-pre-line max-h-60 overflow-y-auto p-3 bg-gray-100 rounded-lg">
                            {content}
                        </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <div>
                            <p>
                                <span className="font-medium">Ngày tạo: </span>
                                {formatDate(createDate)}
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-medium">Ngày chỉnh sửa: </span>
                                {formatDate(updateDate)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}
