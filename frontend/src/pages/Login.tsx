import school from "../assets/hcmut.png";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginAsState, userState } from "../state";
import { useState } from "react";
import axios from "axios";
import { LoginUserDto } from "../dtos/User.dto";

export default function Login() {
    const navigate = useNavigate();
    const isLoginAs = useRecoilValue(isLoginAsState)
    const [user, setUser]  = useRecoilState(userState);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Vui lòng nhập đầy đủ email và mật khẩu");
            return;
        }

        const payload = { email, password };
        try {
            const response = await axios.post("http://localhost:3000/api/v1/login", 
                payload,
                { 
                    headers: { "Content-Type": "application/json" },
                }
            );

            if(response.data.role !== isLoginAs) {
                alert("Đăng nhập sai vai trò, vui lòng đăng nhập lại!")
                return
            }

            const userFromBackend : LoginUserDto = {
                role: response.data.role,
                name: response.data.name,
                user_ID: response.data.user_ID,
                token: response.data.token
            }

            setUser(userFromBackend)
            sessionStorage.setItem('userData', JSON.stringify(userFromBackend))

            if(user?.role === 'student') navigate('/')
            if(user?.role === 'spso') navigate('/SPSO')

        } catch (error) {
            console.error("Login error:", error);
            alert("Đăng nhập thất bại. Vui lòng thử lại.");
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
            <div className="flex w-3/4 shadow-xl rounded-lg overflow-hidden bg-white">
                {/* Bên trái */}
                <div className="w-1/2 flex flex-col items-center justify-center p-10 bg-gray-50">
                    <img src={school} alt="Logo" className="h-16 mb-6" />
                    <h1 className="text-3xl font-extrabold text-blue-600 mb-8">HỆ THỐNG IN ẤN THÔNG MINH</h1>
                    <form className="w-full space-y-6">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input 
                                type="email" 
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Nhập email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                            <input 
                                type="password" 
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Nhập mật khẩu"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <input type="checkbox" id="remember" className="mr-2" />
                                <label htmlFor="remember" className="text-sm text-gray-600">Ghi nhớ tôi</label>
                            </div>
                            <a href="#" className="text-sm text-blue-500 hover:underline">Quên mật khẩu?</a>
                        </div>
                        <button 
                            type="button" 
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
                {/* Bên phải */}
                <div className="w-1/2 bg-blue-600 flex items-center justify-center">
                    <div className="bg-white rounded-full p-8 shadow-lg">
                        <i 
                            className="pi pi-print text-blue-600 text-9xl animate-bounce"
                            style={{
                                padding: '20px', // Padding thêm để icon thoáng hơn
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


