import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import axios from "axios";



export default function AddPaperPopup({ onClose }: { onClose: () => void }) {
    const [semester, setSemester] = useState<string>("");
    const [paperAmount, setPaperAmount] = useState<number>(0);
    const user = useRecoilValue(userState)


    const handleAddPaper = async () => {
        if(!semester || paperAmount === 0) {
            alert("Vui lòng nhập đầy đủ thông tin")
            return
        }

        const confirm = window.confirm("Bạn có chắc muốn thêm giấy, vui lòng kiểm tra lại số lượng vì giấy đã cấp sẽ không thể thu hồi!")

        if(!confirm) return

        try{
            const response = await axios.post('http://localhost:3000/api/v1/paper',{
                semester,
                number: paperAmount,
                scheduler: new Date().toISOString().slice(0, 19).replace('T', ' '),
                spso_ID: user.user_ID
            })

            const res = await axios.post('http://localhost:3000/api/v1/notifications/sendToAll',{
                title: `Cấp giấy cho sinh viên học kỳ ${semester}`,
                content: `Bạn vừa nhận thêm được ${paperAmount} giấy mới nhằm tri ân sinh viên học kỳ mới - học kỳ ${semester}, Chúc bạn sẽ có kỳ học thật thành công!`
            }) 

            alert(`Thêm giấy cho học kỳ ${semester} thành công!`)

            onClose()
        }catch(e){
            alert("Không thể thêm giấy ngay lúc này! Vui lòng thử lại sau")
        }
    }
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-8 rounded-lg shadow-xl w-96 text-left space-y-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <h3 className="text-2xl font-semibold text-center text-indigo-600">Cấp giấy định kỳ</h3>

                {/* Form nhập thông tin */}
                <div className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Kỳ học:</label>
                        <input
                            type="text"
                            className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            placeholder="Nhập kỳ học"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Số lượng giấy cấp:</label>
                        <input
                            type="number"
                            className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
                            value={paperAmount}
                            onChange={(e) => setPaperAmount(Number(e.target.value))}
                            placeholder="Nhập số lượng giấy"
                        />
                    </div>
                </div>

                {/* Nút hành động */}
                <div className="flex justify-end mt-6 space-x-4">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none transition duration-200"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={() => handleAddPaper()}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200"
                    >
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    );
}
