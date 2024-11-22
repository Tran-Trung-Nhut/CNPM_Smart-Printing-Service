import { useRecoilState, useRecoilValue } from 'recoil'
import logo from '../assets/hcmut.png'
import { useNavigate } from 'react-router-dom'
import { isLoginAsState } from '../state'

export default function ChooseLogin(){
    const navigate = useNavigate()
    const [isLoginAs, setISLoginAs] = useRecoilState(isLoginAsState)

    const loginAs = (role: string) => {
        setISLoginAs(role)

        console.log(isLoginAs)
        navigate('/login')
    }

    return(
        <div className="z-1 fixed size-full flex items-center justify-center drop-shadow-lg [background-image:linear-gradient(-90deg,_#6fb1fc,_#4364f7_50%,_#0052d4)]">
             <div className="bg-white p-6 rounded-sm shadow-lg w-96 text-center space-y-4 font-mono">
                <div className='flex items-center justify-center'>
                    <img src={logo} className='size-20 '/>
                </div>
                <div className="w-full max-w-sm border-t border-gray-300 mt-4"></div>
               <div className='flex justify-start'>
                    <p className='text-blue-400'>Đăng nhập với tư cách:</p>
               </div>
               <div>
                    <button 
                    className='border-[1px] rounded w-full hover:bg-gray-300 py-1'
                    onClick={() => loginAs('student')}
                    >
                        Sinh viên
                    </button>
                    <button 
                    className='border-[1px] rounded w-full hover:bg-gray-300 py-1'
                    onClick={() => loginAs('SPSO')}>
                        SPSO
                    </button>
               </div>
               <div className="w-full max-w-sm border-t border-gray-300 mt-4"></div>
            </div>
        </div>
        
    )
}