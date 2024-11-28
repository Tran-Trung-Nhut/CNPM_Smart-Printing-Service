export interface LoginUserDto{
    user_ID: number,
    role: string,
    token: string,
    name: string
}

export const defaultLoginUser : LoginUserDto = {
    user_ID: -1111,
    role: '',
    token: '',
    name: ''
}