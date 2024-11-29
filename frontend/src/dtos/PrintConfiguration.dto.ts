export interface PrintConfigurationDto{
    config_ID: number
    printStart: Date
    printEnd: Date
    user_ID: number
    printer_ID: number
    numPages: number
    numCopies: number
    paperSize: string
    printSide: string
    orientation: string
    status: string
}