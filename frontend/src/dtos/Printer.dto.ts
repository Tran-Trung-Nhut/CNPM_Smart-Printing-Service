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

