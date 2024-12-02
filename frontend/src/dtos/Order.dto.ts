export interface OrderDto {
    order_ID: number,
    user_ID: number,
    quantityPaper: number,
    quantityPackage1: number,
    quantityPackage2: number,
    quantityPackage3: number,
    totalCost: number,
    dateOrder: Date,
    datePaid: Date | null,
    status: string
}

export const defaultOrder: OrderDto = {
    order_ID: -111,
    user_ID: -111,
    quantityPaper: 0,
    quantityPackage1: 0,
    quantityPackage2: 0,
    quantityPackage3: 0,
    totalCost: 0,
    dateOrder: new Date(),
    datePaid: null,
    status: "chưa thanh toán"
}