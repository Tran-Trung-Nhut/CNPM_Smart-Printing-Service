import "primeicons/primeicons.css";
const datas = [
    { name: "Trần Trung Nhựt", MSSV: "2212483", numberOfPrinting: 354, pages: 102 },
    { name: "Lâm Bảo Minh", MSSV: "2212484", numberOfPrinting: 120, pages: 58 },
    { name: "Đặng Tiến Đạt", MSSV: "2212485", numberOfPrinting: 200, pages: 76 },
];

export default function Student() {
    return(
        <div className="overflow-x-auto flex flex-col"> 
            <table className="border-[1px] rounded mt-5 mx-5 bg-white">
                <thead className="bg-[#C6DCFE]">
                    <tr className="">
                        <th className="px-4 py-2"></th>
                        <th className="px-4 py-2">Họ và tên</th>
                        <th className="px-4 py-2">MSSV</th>
                        <th className="px-4 py-2">Tổng số lần in</th>
                        <th className="px-4 py-2">Số trang còn lại</th>
                        <th className="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? "" : "bg-gray-100"}`}>
                            <td className="px-4 py-2 text-center">{index + 1}</td>
                            <td className="px-4 py-2 text-center">{data.name}</td>
                            <td className="px-4 py-2 text-center">{data.MSSV}</td>
                            <td className="px-4 py-2 text-center">{data.numberOfPrinting}</td>
                            <td className="px-4 py-2 text-center">{data.pages}</td>
                            <td className="px-4 py-2 text-center">
                                <button className="text-gray-400">
                                    <i className="pi pi-info-circle"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}