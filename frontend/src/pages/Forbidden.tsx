import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

export default function Forbidden() {
    const navigate = useNavigate();
    const user = useRecoilValue(userState)

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-white overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,abstract')" }}></div>

            <div className="relative z-10 text-center px-6 py-8 max-w-lg mx-auto">
                <h1 className="text-9xl font-extrabold text-white animate__animated animate__zoomIn animate__delay-1s">
                    403
                </h1>
                <p className="mt-4 text-3xl font-semibold text-white animate__animated animate__fadeIn animate__delay-1s">
                    Truy cập bị từ chối
                </p>
                <p className="mt-4 text-lg text-white opacity-80 animate__animated animate__fadeIn animate__delay-2s max-w-lg mx-auto">
                    Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
                </p>

                <div className="mt-8">
                    <button
                        onClick={() => {
                            if(user.role === '' || user.role === 'student') navigate('/')
                            if(user.role === 'spso') navigate('/SPSO')
                        }}
                        className="px-12 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-2xl transform transition duration-300 hover:scale-110 hover:bg-blue-100 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Quay về trang chính
                    </button>
                </div>
            </div>

            <div className="absolute bottom-8 text-white opacity-60 animate__animated animate__fadeIn animate__delay-3s">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100" className="animate-ping">
                    <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" fill="none" />
                    <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="2" fill="none" />
                </svg>
            </div>
        </div>
    );
}
