import { atom } from 'recoil';


export const isLoginAsState = atom<string>({
    key: 'isLoginAsState',
    default: ''
})

export const userState = atom<any>({
    key: 'userState',
})