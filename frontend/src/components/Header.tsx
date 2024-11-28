import { useNavigate } from "react-router-dom";
import school from "../assets/hcmut.png"
import { useRecoilState } from "recoil";
import { isLoginAsState, userState } from "../state";

export default function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState)

    const SigninClick = () =>{
      navigate('/login-as')
    }

    return (
      <div className="flex shadow-2xl border-2 w-full h-16 z-10 bg-white justify-between">
        <div className="space-x-7 flex">
            <img src={school} alt="school_logo" className="ml-6 size-14"/>

            <button 
            type="button" 
            className="font-black hover:scale-110 px-1 active:scale-90"
            onClick={() => {
              if(user.role === "student" || user.role === '') navigate('/')
              if(user.role === "spso") navigate('/SPSO')
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
              if(user.role === '') navigate('/login-as')
              if(user.role === 'spso') navigate('/SPSO/student')
              if(user.role === 'student') navigate('/printhistory')
            }}
            > 
              {user?.role === 'spso'? 'Sinh viên':'Lịch sử in' }
            </button>

            <button 
            type="button" 
            className="font-black hover:scale-110 px-1 active:scale-90"
            onClick={() => {
              if(user.role === '') navigate('/login-as')
              if(user.role === 'spso') navigate('/SPSO/printer')
              if(user.role === 'student') navigate('/')
            }}> 
              {user.role === 'spso'? 'Máy in':'Mua giấy in' } 
            </button>
            {user.role === 'spso' && (
              <button 
              type="button" 
              className="font-black hover:scale-110 px-1 active:scale-90"
              onClick={() => navigate('/SPSO/notification')}
              > 
                Thông báo 
              </button>
            )}
        </div>

        {(user.role === 'student' || user.role === '' ) && (
          <div className="flex items-center mt-2 mr-64">
              <button 
              type="button" 
              className="hover:scale-110 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => {
                if(user.role === '') navigate('/login-as')

                if(user.role === 'student') navigate('/print')
              }}>
                In ngay
              </button>
          </div>
        )}
        
        <div className="justify-end items-center flex mr-5 space-x-2">
          {user.role === 'student' || user.role === 'spso' ? (
            <>
              <i className="pi pi-bell" style={{fontSize: '20px'}}/>
              <button 
                  type="button" 
                  className="rounded border-2 border-blue-600 py-2 px-7 text-blue-600 font-bold"
                  onClick={() => {}}>
                  {user?.name} 
              </button>
            </>
          ) : (
            <button 
                type="button" 
                className="rounded-xl bg-blue-500 px-4 py-2 text-white font-bold hover:scale-110"
                onClick={() => SigninClick()}>
                Đăng nhập
            </button>
          )}
        </div>
      </div>
    );
  }

  
