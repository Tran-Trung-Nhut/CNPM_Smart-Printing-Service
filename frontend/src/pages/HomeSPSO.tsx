export default function HomeSPSO() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center mt-4 text-white">
            {/* Tiêu đề */}
            <div className="text-center space-y-8">
                {/* Biểu tượng */}
                <div className="flex justify-center">
                    <div className="bg-white/20 p-6 rounded-full shadow-xl">
                        <i className="pi pi-print text-8xl text-white"></i>
                    </div>
                </div>

                {/* Nội dung */}
                <div className="space-y-6">
                    <h1 className="text-6xl font-extrabold tracking-wide leading-tight drop-shadow-md">
                        HỆ THỐNG QUẢN LÝ <br />
                        <span className="text-yellow-300">MÁY IN VÀ SINH VIÊN</span>
                    </h1>
                    <p className="text-2xl max-w-4xl mx-auto text-white/80">
                        Trang quản lý dành cho bạn, nơi tập trung quản lý máy in, thông tin sinh viên, và theo dõi hoạt động toàn bộ hệ thống một cách trực quan và hiệu quả.
                    </p>
                </div>

                {/* Thông điệp phụ */}
                <div className="flex items-center justify-center space-x-8 mt-12">
                    <div className="flex flex-col items-center">
                        <i className="pi pi-chart-bar text-5xl text-white/80"></i>
                        <p className="mt-4 text-lg text-white/80">Thống kê toàn diện</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <i className="pi pi-user text-5xl text-white/80"></i>
                        <p className="mt-4 text-lg text-white/80">Quản lý sinh viên</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <i className="pi pi-cog text-5xl text-white/80"></i>
                        <p className="mt-4 text-lg text-white/80">Tối ưu hệ thống</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
