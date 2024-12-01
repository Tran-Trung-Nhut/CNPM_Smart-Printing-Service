
export interface NotificationDto {
    notification_ID: number,
    title: string,
    content: string,
    createDate: Date,
    updateDate: Date,
}

export interface NotificationWithStatusDto {
    notification_ID: number,
    title: string,
    content: string,
    createDate: Date,
    updateDate: Date,
    status: string
}

export interface NotificationWithRecipientDto {
    notification_ID: number,
    user_ID: number,
    status: string
}


export const defaultNotification : NotificationWithStatusDto = {
    notification_ID: -111,
    title: `Unknow`,
    content: 'Unknow',
    createDate: new Date(),
    updateDate: new Date(),
    status: 'unread'
}

export const defaultNotificationWithRecipient : NotificationWithRecipientDto = {
    notification_ID: -111,
    user_ID: -111,
    status: 'unread'
}
