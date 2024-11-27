import { useNavigate } from "react-router-dom";

export default function Forbidden() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white">
            {/* Tiêu đề */}
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-white">403</h1>
                <p className="mt-4 text-3xl font-bold">Truy cập bị từ chối</p>
                <p className="mt-2 text-lg text-blue-200">
                    Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
                </p>
            </div>

            {/* Nút quay về trang chính */}
            <div className="mt-8">
                <button
                    onClick={() => navigate("/")}
                    className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-100 transition duration-200"
                >
                    Quay về trang chính
                </button>
            </div>
        </div>
    );
}
