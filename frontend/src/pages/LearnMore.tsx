export default function LearnMore() {
    return (
        <div className="min-h-screen text-white">
            <div className="container mx-auto px-8 py-16 space-y-16">
                <section className="text-center space-y-6">
                    <h1 className="text-5xl font-extrabold">
                        Tìm hiểu về <span className="text-yellow-300">Hệ Thống In Ấn Thông Minh</span>
                    </h1>
                    <p className="text-lg text-white/80">
                        Hệ thống được thiết kế để hỗ trợ sinh viên in tài liệu nhanh chóng, tiện lợi và tối ưu hóa thời gian.
                        Chúng tôi mang đến một giải pháp in ấn toàn diện, hiện đại và dễ dàng sử dụng.
                    </p>
                </section>

                <section className="space-y-12">
                    <h2 className="text-3xl font-bold text-center">Các tính năng nổi bật</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 hover:scale-105 transition-transform duration-300">
                            <i className="pi pi-print text-5xl text-yellow-300"></i>
                            <h3 className="text-xl font-semibold">In ấn nhanh chóng</h3>
                            <p className="text-center text-white/80">
                                Hỗ trợ in tài liệu chỉ trong vài giây với tùy chọn kích cỡ và số lượng bản in linh hoạt.
                            </p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 hover:scale-105 transition-transform duration-300">
                            <i className="pi pi-cog text-5xl text-yellow-300"></i>
                            <h3 className="text-xl font-semibold">Tùy chỉnh đa dạng</h3>
                            <p className="text-center text-white/80">
                                Lựa chọn in một mặt, hai mặt, khổ giấy, và chất lượng in theo nhu cầu của bạn.
                            </p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 hover:scale-105 transition-transform duration-300">
                            <i className="pi pi-users text-5xl text-yellow-300"></i>
                            <h3 className="text-xl font-semibold">Hỗ trợ sinh viên</h3>
                            <p className="text-center text-white/80">
                                Đội ngũ hỗ trợ luôn sẵn sàng giải quyết các vấn đề liên quan đến in ấn.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-12">
                    <h2 className="text-3xl font-bold text-center">Hướng dẫn sử dụng</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <ul className="space-y-4 text-lg">
                            <li>
                                <span className="font-bold text-yellow-300">1. Đăng nhập:</span> Truy cập hệ thống và đăng nhập bằng tài khoản sinh viên.
                            </li>
                            <li>
                                <span className="font-bold text-yellow-300">2. Tải tài liệu:</span> Tải tài liệu cần in lên hệ thống.
                            </li>
                            <li>
                                <span className="font-bold text-yellow-300">3. Tùy chỉnh in:</span> Lựa chọn số lượng bản in, kích cỡ giấy và các thiết lập khác.
                            </li>
                            <li>
                                <span className="font-bold text-yellow-300">4. Nhận tài liệu:</span> Đến máy in mà bạn đăng ký để nhận tài liệu.
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
