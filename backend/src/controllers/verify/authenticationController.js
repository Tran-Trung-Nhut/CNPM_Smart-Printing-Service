const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../../models/usersModel");
require("dotenv").config(); 
const SECRET_KEY = process.env.SECRET_KEY;  

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.getUserByEmail(email);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.register = async (req, res) => {
    const { user_ID, email, password, name, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { user_ID, email, password: hashedPassword, name, role };
        const result = await userModel.createUser(newUser);
        res.status(201).json({ message: "User created successfully", userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
