const { connectDB } = require("../config/config.js");

let pool;

async function initDB() {
    pool = await connectDB();
}

initDB();

const usersModel = {
    getAllUsers: async () => {
        try {
            const [rows] = await pool.query('SELECT * FROM User');
            return rows;
        } catch (error) {
            console.log(error);
        }
    },

    getUserById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM User WHERE user_ID = ?', [id]);
        return rows[0];
    },

    updateUser: async (id, userData) => {
        try {
            const fields = Object.keys(userData).map(key => `${key} = ?`).join(", ");
            const values = Object.values(userData);

            values.push(id);

            const sql = `UPDATE User SET ${fields} WHERE user_ID = ?`;
            await pool.query(sql, values);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            await pool.query('DELETE FROM User WHERE user_ID = ?', [id]);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },


    createUser: async (userData) => {
        try {
            const { user_ID, email, password, name, role, pageBalance } = userData;
            const [result] = await pool.query('INSERT INTO User (user_ID, email, password, name, role, pageBalance) VALUES (?, ?, ?, ?, ?, ?)', [user_ID, email, password, name, role, pageBalance]);
            return { user_ID, email, password, name, role, pageBalance };
        } catch (error) {
            console.log(error);
        }
    },

    getUserByEmail: async (email) => {
        try {
            const [rows] = await pool.query("SELECT * FROM User WHERE email = ?", [email]);
            return rows[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    },


    
};



module.exports = usersModel;