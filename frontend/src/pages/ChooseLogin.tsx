import { useRecoilState } from "recoil";
import logo from "../assets/hcmut.png";
import { useNavigate } from "react-router-dom";
import { isLoginAsState } from "../state";

export default function ChooseLogin() {
    const navigate = useNavigate();
    const [isLoginAs, setIsLoginAs] = useRecoilState(isLoginAsState);

    const loginAs = (role: string) => {
        setIsLoginAs(role);
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center space-y-8">
                {/* Logo */}
                <div>
                    <img
                        src={logo}
                        alt="Logo"
                        className="mx-auto w-24 h-24 object-contain"
                    />
                </div>

                {/* Tiêu đề */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-blue-600">
                        Chọn vai trò đăng nhập
                    </h1>
                    <p className="text-gray-600">
                        Vui lòng chọn vai trò để tiếp tục truy cập hệ thống.
                    </p>
                </div>

                {/* Nút lựa chọn */}
                <div className="space-y-4">
                    <button
                        className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition"
                        onClick={() => loginAs("student")}
                    >
                        Sinh viên
                    </button>
                    <button
                        className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition"
                        onClick={() => loginAs("spso")}
                    >
                        SPSO
                    </button>
                </div>

                {/* Gạch ngang */}
                <div className="w-full border-t border-gray-200"></div>
            </div>
        </div>
    );
}
