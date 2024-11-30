export interface StudentDto {
    email: string
    name: string
    pageBalance: number
    password: string
    role: string
    user_ID: number
}
export interface StudentShowDto {
    email: string
    name: string
    pageBalance: number
    password: string
    role: string
    user_ID: number
    numOfPrint: number
}

export const defaultStudentShowDto: StudentShowDto = {
    email: '',
    name: '',
    pageBalance: 0,
    password:  '',
    role: '',
    user_ID: -111,
    numOfPrint: 0
}