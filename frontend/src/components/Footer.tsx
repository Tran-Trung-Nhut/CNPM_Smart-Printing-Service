export default function Footer() {
    return (
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white pt-3 mt-16 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <p className="text-xl font-semibold text-white tracking-wide">
                            Smart Printing System Service
                        </p>
                        <p className="text-sm font-medium text-gray-300 mt-2">
                            Software Engineering (CO3001)
                        </p>
                    </div>

                    <div className="text-center md:text-left mt-4 md:mt-0">
                        <p className="text-lg font-semibold text-white mb-2">Contributors:</p>
                        <ul className="text-sm space-y-1 text-gray-300">
                            <li>- Trần Trung Nhựt</li>
                            <li>- Lâm Bảo Minh</li>
                            <li>- Đặng Tiến Đạt</li>
                            <li>- Nguyễn Thanh Khánh</li>
                            <li>- Đặng Nguyễn Minh Thư</li>
                            <li>- Đặng Xuân Huy</li>
                            <li>- Nguyễn Minh Tú</li>
                        </ul>
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-400 to-blue-500"></div>

                <div className="mt-4 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Smart Printing System. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
