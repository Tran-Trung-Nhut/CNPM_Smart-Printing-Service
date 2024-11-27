import home1 from "../assets/home1.png";
import { useNavigate } from "react-router-dom";
import "./css/Home.css"

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <div className="flex flex-col md:flex-row items-center justify-between w-11/12 max-w-7xl">
                {/* Phần trái: Nội dung */}
                <div className="text-center md:text-left md:w-1/2 space-y-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                        HỆ THỐNG <span className="text-yellow-300">IN ẤN</span> THÔNG MINH
                    </h1>
                    <p className="text-lg md:text-xl font-light leading-relaxed">
                        Đây là hệ thống hỗ trợ sinh viên in tài liệu một cách dễ dàng và nhanh chóng.
                        Hệ thống cho phép lựa chọn số bản in, kích cỡ giấy, chế độ in hai mặt và nhiều tính năng khác.
                    </p>
                    <div className="flex items-center justify-center md:justify-start space-x-4">
                        <button 
                            type="button" 
                            className="hover:scale-110 shadow-xl text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-bold rounded-lg text-xl px-14 py-2.5 text-center me-2 mb-2"
                            onClick={() => navigate('/login-as')}>
                                In ngay
                        </button>
                        <button 
                        type="button"
                        className="hover:scale-105 shadow-xl text-blue-700 bg-white font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 active:scale-90"
                        onClick={() => navigate('/learn-more')}>
                            Tìm hiểm thêm
                        </button>
                    </div>
                </div>

                {/* Phần phải: Hình ảnh */}
                <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center items-center">
                    <img
                        src={home1}
                        alt="In ấn thông minh"
                        className="w-3/4 max-w-lg animate-fade-in-up"
                    />
                </div>
            </div>
        </div>
    );
}
