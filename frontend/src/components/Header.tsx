import { useNavigate } from "react-router-dom";
import school from "../assets/hcmut.png"
import { useRecoilState } from "recoil";
import { isLoginAsState } from "../state";

export default function Header() {
    const navigate = useNavigate();
    const [isLoginAs, setISLoginAs] = useRecoilState(isLoginAsState)

    const SigninClick = () =>{
      navigate('/login-as')
    }

    return (
      <div className="flex shadow border-2 w-full h-16 z-10 bg-white justify-between">
        <div className="space-x-7 flex">
            <img src={school} alt="school_logo" className="ml-6 size-14"/>

            <button 
            type="button" 
            className="font-black hover:scale-110 px-1 active:scale-90"
            onClick={() => {
              if(isLoginAs === "SPSO") navigate('/SPSO')
              if(isLoginAs === "student" || isLoginAs === '') navigate('/')
            }}> 
              Trang chủ 
            </button>

            {/* {isLoginAs === 'SPSO' && (
              <button type="button" className="font-black hover:scale-110 px-1"> Lượt in </button>
            )} */}

            <button 
            type="button" 
            className="font-black hover:scale-110 px-1 active:scale-90"
            onClick={() => {
              if(isLoginAs === 'SPSO') navigate('/SPSO/student')
            }}
            > 
              {isLoginAs === 'SPSO'? 'Sinh viên':'Lịch sử in' }
            </button>

            <button 
            type="button" 
            className="font-black hover:scale-110 px-1 active:scale-90"
            onClick={() => {
              if(isLoginAs === 'SPSO') navigate('/SPSO/printer')
            }}> 
              {isLoginAs === 'SPSO'? 'Máy in':'Mua giấy in' } 
            </button>
            {isLoginAs === 'SPSO' && (
              <button 
              type="button" 
              className="font-black hover:scale-110 px-1 active:scale-90"
              onClick={() => navigate('/SPSO/notification')}
              > 
                Thông báo 
              </button>
            )}
        </div>

        {(isLoginAs === 'student' || isLoginAs === '' ) && (
          <div className="flex items-center mt-2 mr-64">
              <button 
              type="button" 
              className="hover:scale-110 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => navigate('/login-as')}>
                In ngay
              </button>
          </div>
        )}
        
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

  
