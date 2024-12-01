import { useLocation, useNavigate } from "react-router-dom";
import school from "../assets/hcmut.png"
import { useRecoilState } from "recoil";
import { isLoginAsState, userState } from "../state";
import { useState } from "react";
import { defaultLoginUser } from "../dtos/User.dto";
import LogoutConfirm from "./LogoutConfirm";
import UserProfile from "./UserProfile";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation()
    const [user, setUser] = useRecoilState(userState)
    const [isOpenDropdown, setIsOpenDropDown] = useState(false);
    const [isLoginAs, setIsLoginAs] = useRecoilState(isLoginAsState)
    const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
    const [isShowProfile, setIsShowProfile] = useState<boolean>(false);

    const SigninClick = () =>{
      navigate('/login-as')
    }

    const handleClickDropDown = (action: string) => {
      if(action === 'logout') setIsShowConfirm(true)
      
      if(action === 'information') setIsShowProfile(true)
    }

    const handlePrintNow = () => {
      const currentLocation = location.pathname
      if(user.role === '') navigate('/login-as')
      if(user.role === 'student' && 
        currentLocation !== '/print' &&
        currentLocation !== '/choose-printer' &&
        currentLocation !== '/print-config' &&
        currentLocation !== '/print-complete') navigate('/print')
    }

    return (
      <div className="flex shadow-2xl border-2 w-full h-16 z-10 bg-white justify-between">
        {isShowConfirm && (
          <LogoutConfirm onClose={() => setIsShowConfirm(false)}/>
        )}
        {isShowProfile && (
          <UserProfile onClose={() => setIsShowProfile(false)}/>
        )}
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
              if(user.role === 'student') navigate('/buy-paper')
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
              onClick={() => handlePrintNow()}>
                In ngay
              </button>
          </div>
        )}
        
        <div className="justify-end items-center flex mr-5 space-x-2">
          {user.role === 'student' || user.role === 'spso' ? (
            <>
              <i className="pi pi-bell" style={{fontSize: '20px'}}/>
              <div className="relative">
                <button 
                    type="button" 
                    className="rounded border-2 border-black  p-2 font-bold"
                    onClick={() => setIsOpenDropDown(!isOpenDropdown)}>
                    {user?.name} 
                </button>
                {isOpenDropdown && (
                  <ul className="absolute right-0 bg-white border border-gray-200 shadow-md rounded-md w-48 z-10">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleClickDropDown('information')}
                    >
                      Thông tin cá nhân
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleClickDropDown('logout')}
                    >
                      Đăng xuất
                    </li>
                  </ul>
                )}
              </div>
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

  
