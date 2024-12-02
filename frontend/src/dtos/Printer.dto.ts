export interface PrinterDto {
    Printer_ID: number
    branchName: string
    description: string
    location: {
        campus: string,
        building: string,
        room: string
    }
    model: string
    status: string
}

export const defaultPrinterDto:  PrinterDto = {
    Printer_ID: -111,
    branchName: '',
    description: '',
    location: {
        campus: '',
        building: '',
        room: ''
    },
    model: '',
    status: 'enable'
}

