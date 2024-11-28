import { atom } from 'recoil';
import { LoginUserDto } from './dtos/User.dto';


export const isLoginAsState = atom<string>({
    key: 'isLoginAsState',
    default: ''
})

export const userState = atom<LoginUserDto | null>({
    key: 'userState',
    default: null
})