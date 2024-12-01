import { useSetRecoilState } from "recoil";
import { isLoginAsState, userState } from "../state";
import { defaultLoginUser } from "../dtos/User.dto";
import { useNavigate } from "react-router-dom";

export default function LogoutConfirm({ onClose }: { onClose: () => void }) {
    const setIsLoginAs = useSetRecoilState(isLoginAsState)
    const setUser = useSetRecoilState(userState)

    const navigate = useNavigate()

    const handleAccept  = () => {
        sessionStorage.removeItem('userData')
        setIsLoginAs('')
        setUser(defaultLoginUser)
        navigate('/')
        onClose()
    }

    return (
      <div
        className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-10 rounded-xl shadow-2xl w-[500px] max-w-lg transform transition-all duration-300 scale-95 hover:scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Xác nhận đăng xuất
          </h3>
  
          <p className="text-lg text-gray-600 mb-8 text-center">
            Bạn chắc chắn muốn đăng xuất khỏi tài khoản này? Hãy chắc chắn rằng bạn đã lưu lại công việc.
          </p>
  
          <div className="flex justify-around">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg transition duration-300 transform hover:bg-gray-300 hover:scale-105"
            >
              Hủy
            </button>
  
            <button
              onClick={() => handleAccept()}
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg transition duration-300 transform hover:bg-red-700 hover:scale-105"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    );
  }
  