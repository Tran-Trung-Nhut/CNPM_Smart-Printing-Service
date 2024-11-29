import { atom } from 'recoil';
import { defaultLoginUser, LoginUserDto } from './dtos/User.dto';
import { DocumentDto } from './dtos/File.dto';


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
    default: defaultLoginUser
})

export const documentState = atom<DocumentDto[]>({
    key: 'documentState',
    default: []
})

export const numPagesState = atom<number>({
    key: 'numPagesState',
    default: 1
})

export const numCopiesState = atom<number>({
    key: 'numCopiesState',
    default: 1
})

export const paperSizeState = atom<string>({
    key: 'paperSizeState',
    default: 'A4'
})

export const printSideState = atom<string>({
    key: 'printSideState',
    default: 'single-sided'
})

export const orientationState = atom<string>({
    key: 'orientationState',
    default: 'portrait'
})

export const printerIDState = atom<number>({
    key: 'printerIDState',
    default: -1111
})