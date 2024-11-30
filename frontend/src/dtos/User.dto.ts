export interface LoginUserDto{
    user_ID: number,
    role: string,
    token: string,
    name: string
}

export interface UserDto{
    user_ID: number
    email: string
    password: string
    name: string
    role: string
    pageBalance: number
}

export const defaultLoginUser : LoginUserDto = {
    user_ID: -1111,
    role: '',
    token: '',
    name: ''
}

export const defaultUser: UserDto = {
    user_ID: -111,
    email: '',
    password: '',
    name: '',
    role: '',
    pageBalance: 0
}