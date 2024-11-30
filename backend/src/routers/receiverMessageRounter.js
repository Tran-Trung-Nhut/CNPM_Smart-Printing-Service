module.exports = (router) => {
    const receiverMessageController = require("../controllers/receiverMessageController");

    // Gửi thông báo đến một người dùng cụ thể
    router.post("/notifications/send", receiverMessageController.sendNotificationToUser);

    // Lấy danh sách người nhận của một thông báo
    router.get("/notifications/:notificationId/receivers", receiverMessageController.getReceiversByNotification);

    // Lấy danh sách thông báo được gửi đến một người dùng
    router.get("/users/:userId/notifications", receiverMessageController.getNotificationsForUser);

    // Xóa một người nhận khỏi thông báo
    router.delete("/notifications/:notificationId/receivers/:userId", receiverMessageController.removeReceiverFromNotification);

    // Gửi thông báo đến tất cả người dùng
    router.post("/notifications/sendToAll", receiverMessageController.sendNotificationToAllUsers);
};
