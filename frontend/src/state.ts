import { atom } from 'recoil';
import { LoginUserDto } from './dtos/User.dto';


export const isLoginAsState = atom<string>({
    key: 'isLoginAsState',
    default: ''
})

export const isPrintingSuccessState = atom<boolean>({
    key: 'isPrintingSuccessState',
    default: false
})

export const userState = atom<LoginUserDto>({
    key: 'userState',
    default: {
        name: '',
        role: '',
        user_ID: -111111,
        token: ''
    }
})