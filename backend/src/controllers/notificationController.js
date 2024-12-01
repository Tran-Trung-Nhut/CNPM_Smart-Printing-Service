const notificationModel = require("../models/notificationModel");

// Lấy tất cả các thông báo
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await notificationModel.getAllNotifications();

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ status: 404, message: "No Notifications Found" });
        }

        res.status(200).json({ status: 200, data: notifications, message: "Successfully Retrieved Notifications!" });
    } catch (error) {
        console.error("Error Retrieving Notifications:", error.message);
        res.status(500).json({ status: 500, message: 'Error Retrieving Notifications', error: error.message });
    }
};

// Tạo mới thông báo
exports.createNotification = async (req, res) => {
    try {
        const { title, content } = req.body;

        const newNotification = await notificationModel.createNotification(title, content);
        res.status(201).json({ status: 201, data: newNotification, message: "Successfully Created Notification!" });
    } catch (error) {
        console.error("Error Creating Notification:", error);
        res.status(500).json({ status: 500, message: 'Error Creating Notification' });
    }
};

// Lấy thông báo theo ID
exports.getNotificationById = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notification = await notificationModel.getNotificationById(notificationId);

        if (!notification) {
            return res.status(404).json({ status: 404, message: "Notification Not Found" });
        }

        res.status(200).json({ status: 200, data: notification, message: "Successfully Retrieved Notification!" });
    } catch (error) {
        console.error("Error Retrieving Notification:", error.message);
        res.status(500).json({ status: 500, message: 'Error Retrieving Notification', error: error.message });
    }
};

// Xóa thông báo theo ID
exports.deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const deletedNotification = await notificationModel.deleteNotification(notificationId);

        if (!deletedNotification) {
            return res.status(404).json({ status: 404, message: "Notification Not Found" });
        }

        res.status(200).json({ status: 200, data: deletedNotification, message: "Successfully Deleted Notification!" });
    } catch (error) {
        console.error("Error Deleting Notification:", error.message);
        res.status(500).json({ status: 500, message: 'Error Deleting Notification', error: error.message });
    }
};


exports.getNotificationsForUser = async (req, res) => {
    const { user_ID } = req.params;  // Lấy user_ID từ tham số URL

    try {
        // Lấy tất cả thông báo gửi đến user cụ thể
        const notifications = await notificationModel.getNotificationsForUser(user_ID);

        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ status: 404, message: `No Notifications Found for User ${user_ID}` });
        }

        res.status(200).json({ status: 200, data: notifications, message: `Successfully Retrieved Notifications for User ${user_ID}` });
    } catch (error) {
        console.error("Error Retrieving Notifications for User:", error.message);
        res.status(500).json({ status: 500, message: 'Error Retrieving Notifications for User', error: error.message });
    }
};