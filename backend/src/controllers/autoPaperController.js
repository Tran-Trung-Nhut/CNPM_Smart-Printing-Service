const autoPaperModel = require("../models/autoPaperModel");

exports.getAllAutoPapers = async (req, res) => {
    try {
        const autoPapers = await autoPaperModel.getAllAutoPapers();
        res.status(200).json({ status: 200, data: autoPapers, message: "Danh sách các kỳ học và số lượng giấy miễn phí đã được lấy thành công!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Lỗi khi lấy danh sách các kỳ học" });
    }
};

exports.createAutoPaper = async (req, res) => {
    const { semester, number, scheduler, spso_ID } = req.body;

    try {
        await autoPaperModel.createAutoPapers(semester, number, scheduler, spso_ID);
        res.status(201).json({ status: 201, message: "Kỳ học mới và số lượng giấy miễn phí đã được thêm thành công!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Lỗi khi thêm kỳ học mới" });
    }
};

exports.updateAutoPaper = async (req, res) => {
    const { semester } = req.params;
    const { number, scheduler } = req.body;

    try {
        await autoPaperModel.updateAutoPaper(semester, number, scheduler);
        res.status(200).json({ status: 200, message: "Thông tin kỳ học đã được cập nhật thành công!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Lỗi khi cập nhật thông tin kỳ học" });
    }
};

exports.buyPages = async (req, res) => {
    const { user_ID, additionalPages } = req.body;

    try {
        const currentBalance = await autoPaperModel.getStudentPageBalance(user_ID);
        await autoPaperModel.updateStudentPageBalance(user_ID, additionalPages);
        res.status(200).json({ status: 200, message: `Mua thêm ${additionalPages} trang thành công! Số dư hiện tại: ${currentBalance + additionalPages} trang.` });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Lỗi khi mua thêm giấy" });
    }
};
