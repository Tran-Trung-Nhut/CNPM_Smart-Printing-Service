import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

export default function NotFound() {
    const navigate = useNavigate();
    const user = useRecoilValue(userState)

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white">
            <div className="text-center space-y-6">
                <div className="flex justify-center">
                    <div className="bg-white/20 p-6 rounded-full shadow-lg  animate-bounce">
                        <i className="pi pi-times-circle text-8xl text-white"></i>
                    </div>
                </div>

                <h1 className="text-8xl font-extrabold tracking-wide animate-pulse">404</h1>
                <p className="text-3xl font-bold animate-pulse">Trang không tồn tại</p>
                <p className="text-lg text-blue-200 max-w-lg mx-auto animate-pulse">
                    Đường dẫn bạn truy cập không chính xác hoặc đã bị di chuyển. Vui lòng quay về trang chính để tiếp tục sử dụng dịch vụ.
                </p>
            </div>

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
    );
}
