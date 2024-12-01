const { connectDB } = require("../config/config.js");
const query = require("../config/query.js");

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();

const notificationModel = {
    getAllNotifications: async () => {
        try {
            const notifications = await query.getAll("Notification_Message");
            return notifications;
        } catch (error) {
            console.error("Error in getAllNotifications:", error);
            throw error;
        }
    },

    createNotification: async (title, content) => {
        try {
            const notificationData = { title, content };
            const result = await query.insertSingleRow("Notification_Message", notificationData);
            return { notification_ID: result.insertId, ...notificationData };
        } catch (error) {
            console.error("Error in createNotification:", error);
            throw error;
        }
    },

    getNotificationById: async (notification_ID) => {
        try {
            const notification = await query.getOne("Notification_Message", { notification_ID });
            return notification;
        } catch (error) {
            console.error("Error in getNotificationById:", error);
            throw error;
        }
    },

    deleteNotification: async (notification_ID) => {
        try {
            const result = await query.deleteRow("Notification_Message", { notification_ID });
            return result ? { notification_ID } : null;
        } catch (error) {
            console.error("Error in deleteNotification:", error);
            throw error;
        }
    },

    getNotificationsForUser: async (user_ID) => {
        try {
            // Truy vấn để lấy tất cả thông báo mà user này đã nhận
            const queryStr = `
                SELECT nm.*, rm.user_ID
                FROM Notification_Message nm
                JOIN Receiver_Message rm ON nm.notification_ID = rm.notification_ID
                WHERE rm.user_ID = ?
            `;
            const notifications = await pool.query(queryStr, [user_ID]);

            return notifications[0] || [];
        } catch (error) {
            console.error("Error in getNotificationsForUser:", error);
            throw error;
        }
    },
    addReceiver: async (notification_ID, user_ID) => {
        try {
            // Tạo dữ liệu để chèn vào bảng Receiver_Message
            const receiverData = { notification_ID, user_ID };

            // Chèn dữ liệu vào bảng
            const result = await query.insertSingleRow('Receiver_Message', receiverData);

            return result;
        } catch (error) {
            console.error("Error in addReceiver:", error);
            throw error;
        }
    },
    getReceiversByNotification: async (notification_ID) => {
        try {
            // Lấy danh sách người nhận từ bảng Receiver_Message
            const receivers = await query.getAll('Receiver_Message', { notification_ID });

            // Nếu không tìm thấy người nhận
            if (!receivers || receivers.length === 0) {
                return [];
            }

            return receivers.map(receiver => receiver.user_ID); // Chỉ trả về danh sách user_ID
        } catch (error) {
            console.error("Error in getReceiversByNotification:", error);
            throw error;
        }
    },
    removeReceiver: async (notification_ID, user_ID) => {
        try {
            // Xóa một người nhận từ bảng Receiver_Message
            const result = await query.deleteRow('Receiver_Message', { notification_ID, user_ID });

            if (result.affectedRows === 0) {
                throw new Error("Receiver not found or already removed");
            }

            return {
                message: "Receiver successfully removed",
                notification_ID,
                user_ID
            };
        } catch (error) {
            console.error("Error in removeReceiver:", error);
            throw error;
        }
    }
};

module.exports = notificationModel;
