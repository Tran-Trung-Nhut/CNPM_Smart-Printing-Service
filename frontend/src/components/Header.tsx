import { useNavigate } from "react-router-dom";
import school from "../assets/hcmut.png"

export default function Header() {
    const navigate = useNavigate();

    const SigninClick = () =>{
      navigate('/login')
    }

    return (
      <div className="flex shadow border-2 w-full h-16 z-10 bg-white justify-between font-mono  ">
        <div className="space-x-7 flex">
            <img src={school} alt="school_logo" className="ml-6 size-14"/>
            <button type="button" className="font-black hover:scale-110 px-1"> Trang chủ </button>
            <button type="button" className="font-black hover:scale-110 px-1"> Lịch sử </button>
            <button type="button" className="font-black hover:scale-110 px-1"> Mua giấy </button>
        </div>
        <div className="flex items-center mt-2 mr-64">
            <button type="button" className="hover:scale-110 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2">In ngay</button>
        </div>
        <div className="justify-end items-center flex mr-8">
            <button 
            type="button" 
            className="rounded-xl bg-blue-500 px-4 py-2 text-white font-bold hover:scale-110"
            onClick={SigninClick}
            >Đăng nhập
            </button>
        </div>
      </div>
    );
  }

  