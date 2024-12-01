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