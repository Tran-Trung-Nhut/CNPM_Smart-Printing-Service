import Modal from "react-modal"
import SelectReciever from "./SelectReciever"
import { useState } from "react"

interface CreateNotificationProps{
    isOpen: boolean
    setIsOpen: (val: boolean) => void
}

export default function CreateNotification({isOpen, setIsOpen}: CreateNotificationProps) {
    const [isChoosing, setIsChoosing] = useState<boolean>(false)

    return(
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)} // Đóng modal khi nhấn ngoài
                style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                },
                }}
            >
                <p className="text-xl font-mono font-bold mb-4 text-center">Tạo thông báo mới</p>
                <form className="space-y-4 font-mono">
                <button
                type="button"
                className="border-[1px] w-full flex items-start"
                onClick={() => setIsChoosing(true)}>
                    <div className="w-56 flex justify-start">
                        <p className="pl-2 text-gray-400">Người nhận</p>
                    </div>
                </button>
                <input 
                    type="text" 
                    placeholder="Tiêu đề" 
                    className="w-full border rounded p-2 focus:outline-none"
                />
                <textarea 
                    placeholder="Nội dung thông báo" 
                    className="w-full border rounded p-2 focus:outline-none h-32"
                />
                <div className="flex justify-end space-x-2">
                    <button 
                    type="button" 
                    className="bg-gray-400 text-white px-4 py-2 rounded" 
                    onClick={() => setIsOpen(false)} // Đóng modal khi nhấn hủy
                    >
                    Hủy
                    </button>
                    <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                    Gửi
                    </button>
                </div>
                </form>
            </Modal>

            <SelectReciever isOpen={isChoosing} setIsOpen={setIsChoosing}/>
        </>
    )
}