import "primeicons/primeicons.css";
const datas = [
    { name: "Trần Trung Nhựt", MSSV: "2212483", numberOfPrinting: 354, pages: 102 },
    { name: "Lâm Bảo Minh", MSSV: "2212484", numberOfPrinting: 120, pages: 58 },
    { name: "Đặng Tiến Đạt", MSSV: "2212485", numberOfPrinting: 200, pages: 76 },
];

export default function Printer() {
    return(
        <div className="overflow-x-auto flex justify-center items-center"> 
            <table className="border-[1px] rounded mt-5 w-full mx-3 bg-white">
                <thead className="bg-[#C6DCFE]">
                    <tr className="">
                        <th></th>
                        <th>Hãng máy in</th>
                        <th>Mã số máy in</th>
                        <th>Vị trí</th>
                        <th>Tình trạng</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data, index) => (
                        <tr key={index} className={index % 2 === 0 ? "" : "bg-gray-100"}>
                            <td className="border px-4 py-2 text-center">{index + 1}</td>
                            <td className="border px-4 py-2 text-center">{data.name}</td>
                            <td className="border px-4 py-2 text-center">{data.MSSV}</td>
                            <td className="border px-4 py-2 text-center">{data.numberOfPrinting}</td>
                            <td className="border px-4 py-2 text-center">{data.pages}</td>
                            <td className="border px-4 py-2 text-center">
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