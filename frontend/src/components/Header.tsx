import { useLocation, useNavigate } from "react-router-dom";
import school from "../assets/hcmut.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginAsState, notificationState, userState } from "../state";
import { useEffect, useState } from "react";
import { defaultLoginUser } from "../dtos/User.dto";
import LogoutConfirm from "./LogoutConfirm";
import UserProfile from "./UserProfile";
import { defaultNotification, NotificationDto, NotificationWithRecipientDto, NotificationWithStatusDto } from "../dtos/Notification.dto";
import axios from "axios";
import NotificationInformationPopup from "./NotificationInformationPopup";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useRecoilState(userState);
    const [isOpenDropdown, setIsOpenDropDown] = useState(false);
    const [isOpenDropdownNotifcation, setIsOpenDropDownNotification] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState<boolean>(false);
    const [isShowProfile, setIsShowProfile] = useState<boolean>(false);
    const [notification, setNotification] = useRecoilState(notificationState)
    const [isShowNotificationInformation, setIsShowNotificationInformation] = useState<boolean>(false)
    const [selectedNotification, setSelectedNotification] = useState<NotificationWithStatusDto>(defaultNotification)

    const formatDate = (date: any) => {
        const parsedDate = new Date(date);
        if (parsedDate.toString() === 'Invalid Date') {
            return 'Ngày không hợp lệ';
        }
        return new Intl.DateTimeFormat("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        }).format(parsedDate);
    };

    const SigninClick = () => {
        navigate('/login-as');
    };

    const handleClickDropDown = (action: string) => {
        if (action === 'logout') setIsShowConfirm(true);
        if (action === 'information') setIsShowProfile(true);
    };

    const handlePrintNow = () => {
        const currentLocation = location.pathname;
        if (user.role === '') navigate('/login-as');
        if (user.role === 'student' &&
            currentLocation !== '/print' &&
            currentLocation !== '/choose-printer' &&
            currentLocation !== '/print-config' &&
            currentLocation !== '/print-complete') navigate('/print');
    };

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/users/${user.user_ID}/notifications/details`,);
            

            setNotification(response.data.data)
            
        } catch (e) {
            console.log(e)
            setNotification([]);
        }
    };

    useEffect(() => {
        fetchNotifications()
    }, []); 

    const markAsRead = async (notificationInfor: NotificationWithStatusDto) => {
        setSelectedNotification(notificationInfor)

        setIsShowNotificationInformation(true)

        console.log(isShowNotificationInformation)

        if(notificationInfor.status === 'unread'){
            try {
                const response = await axios.put(`http://localhost:3000/api/v1/notifications/${notificationInfor.notification_ID}/user/${user.user_ID}/read`)
    
                console.log(response)
    
                fetchNotifications()
    
            } catch (e) {
                console.error('Không thể đánh dấu thông báo là đã đọc!', e);
            }
        }
    };

    const unreadNotificationsCount = notification.filter(notif => notif.status !== 'read').length;

    return (
        <div className="flex shadow-2xl border-2 w-full h-16 z-10 bg-white justify-between">
            {isShowConfirm && (
                <LogoutConfirm onClose={() => setIsShowConfirm(false)} />
            )}
            {isShowProfile && (
                <UserProfile onClose={() => setIsShowProfile(false)} />
            )}
            {isShowNotificationInformation && (
                <NotificationInformationPopup
                onClose={() => setIsShowNotificationInformation(false)}
                title={selectedNotification.title}
                content={selectedNotification.content}
                createDate={selectedNotification.createDate}
                updateDate={selectedNotification.updateDate} 
                />
            )}
            <div className="space-x-7 flex">
                <img src={school} alt="school_logo" className="ml-6 size-14" />
                <button
                    type="button"
                    className="font-black hover:scale-110 px-1 active:scale-90"
                    onClick={() => {
                        if (user.role === "student" || user.role === '') navigate('/');
                        if (user.role === "spso") navigate('/SPSO');
                    }}
                >
                    Trang chủ
                </button>

                <button
                    type="button"
                    className="font-black hover:scale-110 px-1 active:scale-90"
                    onClick={() => {
                        if (user.role === '') navigate('/login-as');
                        if (user.role === 'spso') navigate('/SPSO/student');
                        if (user.role === 'student') navigate('/printhistory');
                    }}
                >
                    {user?.role === 'spso' ? 'Sinh viên' : 'Lịch sử in'}
                </button>

                <button
                    type="button"
                    className="font-black hover:scale-110 px-1 active:scale-90"
                    onClick={() => {
                        if (user.role === '') navigate('/login-as');
                        if (user.role === 'spso') navigate('/SPSO/printer');
                        if (user.role === 'student') navigate('/buy-paper');
                    }}
                >
                    {user.role === 'spso' ? 'Máy in' : 'Mua giấy in'}
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

            {(user.role === 'student' || user.role === '') && (
                <div className="flex items-center mt-2 mr-64">
                    <button
                        type="button"
                        className="hover:scale-110 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => handlePrintNow()}
                    >
                        In ngay
                    </button>
                </div>
            )}

            <div className="justify-end items-center flex mr-5 space-x-2">
                {user.role === 'student' || user.role === 'spso' ? (
                    <>
                        {user.role === 'student' && (
                          <button
                                type="button"
                                className="relative hover:scale-110 active:scale-90"
                                onClick={() => setIsOpenDropDownNotification(!isOpenDropdownNotifcation)}
                            >
                                <i className="pi pi-bell" style={{ fontSize: '20px' }} />
                                {unreadNotificationsCount > 0 && (
                                    <span className="absolute top-[-5px] right-[-4px] w-4 h-4 bg-red-500 text-white text-xs rounded-full flex justify-center items-center">{unreadNotificationsCount}</span>
                                )}
                            </button>
                        )}
                        <div className="relative">
                            {isOpenDropdownNotifcation && (
                                <div
                                    className="absolute right-0 bg-white border border-gray-200 shadow-md rounded-md w-64 z-10 mt-2 max-h-64 overflow-y-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {notification.map((notif) => (
                                        <div
                                            key={notif.notification_ID}
                                            className={`px-4 py-2 cursor-pointer ${notif.status === 'read' ? 'bg-white' : 'bg-gray-300'}`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                markAsRead(notif)
                                            }}
                                        >
                                            <p className={`font-bold ${true ? 'text-gray-700' : 'text-black'}`}>
                                                {notif.title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {formatDate(notif.createDate)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
                        onClick={() => SigninClick()}
                    >
                        Đăng nhập
                    </button>
                )}
            </div>
        </div>
    );
}
