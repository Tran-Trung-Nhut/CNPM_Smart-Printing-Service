const usersModel = require("../../models/main/usersModel");

exports.getAllUsers = async (req, res) => {
    try {
        const allData = await usersModel.getAllUsers();
        res.status(200).json({ status: 200, data: allData, message: "Succesfully Users Retrieved!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error Retrieving Users' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await usersModel.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ status: 404, message: "User does not exist" });
        }
        res.status(200).json({ status: 200, data: user, message: "User details retrieved successfully!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error retrieving user details' });
    }
};

  exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    try {
        await usersModel.updateUser(id, userData);
        res.status(200).json({ status: 200, message: "User updated successfully!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error updating user' });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await usersModel.deleteUser(id);
        res.status(200).json({ status: 200, message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error deleting user' });
    }
};

