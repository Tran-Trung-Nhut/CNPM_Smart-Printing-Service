import Header from "../components/Header";
import home1 from "../assets/home1.png"

export default function Home(){
    return(
        <div
      className="z-1 size-full"
    >
            <div className="flex items-center size-auto">
                <div className="font-mono text-white text-center space-y-3 pt-16 ml-20">
                    <p className="text-6xl font-bold">HỆ THỐNG IN ẤN THÔNG MINH</p>
                    <div>
                        <p>Đây là hệ thống hỗ trợ sinh viên in tài liệu một cách dễ dàng và nhanh chóng.</p>
                        <p>Hệ thống này cho phép sinh viên tự do lựa chọn số bản cần in, kích cỡ giấy, một hay hai mặt,...</p>
                    </div>
                    <div className="flex items-center justify-center space-x-2 pt-5">
                        <button type="button" className="hover:scale-110 shadow-xl text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-bold rounded-lg text-xl px-14 py-2.5 text-center me-2 mb-2">In ngay</button>
                        <button className="hover:scale-105 shadow-xl text-blue-700 bg-white font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2">Tìm hiểm thêm</button>
                    </div>
                </div>
                <div className="pt-24 size-full flex items-center justify-center">
                    <img src={home1} className="w-[50%] h-[50%]"/>
                </div>
            </div>
        </div>
    )
} 
