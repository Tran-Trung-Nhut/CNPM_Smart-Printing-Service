
export interface NotificationDto {
    notification_ID: number,
    title: string,
    content: string,
    createDate: Date,
    updateDate: Date,
}

export const defaultNotification : NotificationDto = {
    notification_ID: -111,
    title: `Unknow`,
    content: 'Unknow',
    createDate: new Date(),
    updateDate: new Date()
}
