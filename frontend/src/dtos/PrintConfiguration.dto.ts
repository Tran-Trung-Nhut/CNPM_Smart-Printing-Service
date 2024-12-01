import { DocumentDbDto } from "./File.dto"

export interface PrintConfigurationDto{
    config_ID: number
    printStart: Date
    printEnd: Date | null
    user_ID: number
    printer_ID: number
    numPages: number
    numCopies: number
    paperSize: string
    printSide: string
    orientation: string
    status: string
    documents:[DocumentDbDto]
}

export const  defaultPrintConfigurationDto : PrintConfigurationDto = {
    config_ID: -111,
    printStart: new Date(),
    printEnd: null,
    user_ID: -111,
    printer_ID: -111,
    numPages: 0,
    numCopies: 0,
    paperSize: '',
    printSide: '',
    orientation: '',
    status: 'unCompleted',
    documents: [{
        config_ID: -111,
        name: '',
        size: 0,
        lastModifiedDate: new Date()
    }]
}