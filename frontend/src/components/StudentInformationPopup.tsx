export default function StudentInformationPopup({ onClose }: { onClose: () => void }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose} // Đóng popup khi bấm vào backdrop
        >
            <div
                className="bg-white p-6 rounded-sm shadow-lg w-96 text-center space-y-4 font-mono"
                onClick={(e) => e.stopPropagation()} // Ngăn sự kiện lan truyền
            >
                <div className="flex justify-start">
                    <p className="text-blue-400">Đăng nhập với tư cách:</p>
                </div>
                <div>
                    <button
                        className="border-[1px] rounded w-full hover:bg-gray-300 py-1"
                        onClick={onClose}
                    >
                        Sinh viên
                    </button>
                    <button
                        className="border-[1px] rounded w-full hover:bg-gray-300 py-1"
                        onClick={onClose}
                    >
                        SPSO
                    </button>
                </div>
                <div className="w-full max-w-sm border-t border-gray-300 mt-4"></div>
            </div>
        </div>
    );
}
