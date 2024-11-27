import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white">
            {/* Biểu tượng và Tiêu đề */}
            <div className="text-center space-y-6">
                {/* Biểu tượng */}
                <div className="flex justify-center">
                    <div className="bg-white/20 p-6 rounded-full shadow-lg">
                        <i className="pi pi-times-circle text-8xl text-white"></i>
                    </div>
                </div>

                {/* Tiêu đề lỗi */}
                <h1 className="text-8xl font-extrabold tracking-wide">404</h1>
                <p className="text-3xl font-bold">Trang không tồn tại</p>
                <p className="text-lg text-blue-200 max-w-lg mx-auto">
                    Xin lỗi, đường dẫn bạn truy cập không chính xác hoặc đã bị di chuyển. Vui lòng quay về trang chính để tiếp tục sử dụng dịch vụ.
                </p>
            </div>

            {/* Nút quay về */}
            <div className="mt-10">
                <button
                    onClick={() => navigate("/")}
                    className="px-10 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-100 transition duration-200"
                >
                    Quay về trang chính
                </button>
            </div>
        </div>
    );
}
