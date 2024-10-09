import Header from "../components/Header"
import login1 from "../assets/login1.png"
import school from "../assets/hcmut.png"

export default function Login() {
  return (
    <div
      className="z-1 size-full drop-shadow-lg [background-image:linear-gradient(-90deg,_#6fb1fc,_#4364f7_50%,_#0052d4)]"
    >
        <div className="flex flex-col">
            <div className="flex items-center justify-center space-x-4">
                <img src={school} className="size-16 mt-5"/>
                <p className="font-bold font-mono text-white text-5xl mt-5">HỆ THỐNG IN ẤN THÔNG MINH</p>
            </div>
            <div className="flex justify-between">
                <div className="bg-transparent font-mono size-full py-3">
                    <div className="flex flex-col items-center justify-center px-4">
                        <div className="p-8 rounded-2xl bg-transparent">
                            <h2 className="text-white text-center text-3xl font-bold pb-4">Thông tin đăng nhập</h2>
                            <form className=" space-y-4">
                            <div>
                                <label className="text-white text-sm mb-2 block">Tài khoản</label>
                                <div className="relative flex items-center">
                                <input name="username" type="text" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter user name" />
                                <svg  fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                </svg>
                                </div>
                            </div>

                            <div>
                                <label className="text-white text-sm mb-2 block">Mật khẩu</label>
                                <div className="relative flex items-center">
                                <input name="password" type="password" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
                                <svg fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                </svg>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-3 block text-sm text-white">
                                    Ghi nhớ tôi
                                </label>
                                </div>
                                <div className="text-sm">
                                <a href="jajvascript:void(0);" className="text-white hover:underline font-semibold">
                                    Quên mật khẩu?
                                </a>
                                </div>
                            </div>

                            <div className="!mt-8">
                                <button type="button" className="shadow w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                Đăng nhập
                                </button>
                            </div>
                            <p className="text-white text-sm !mt-8 text-center">Chưa có tài khoản? <a href="javascript:void(0);" className="text-white hover:underline ml-1 whitespace-nowrap font-semibold">Đăng ký</a></p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <img src={login1} className="size-6/7 pr-7 mb-10"/>
                </div>
            </div>
        </div>
    </div>
  );
}
