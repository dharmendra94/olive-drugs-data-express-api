const dotenv = require("dotenv");
dotenv.config();
const mysql2 = require("mysql2");

class DBConnection {
    constructor() {
        this.db = mysql2.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        });

        this.checkConnection();
    }

    checkConnection() {
        // Learn more about this MySQL library
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                else if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                else if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
                else {
                    console.error("Database connection failed", err);
                }

            }
            if (connection) {
                connection.release();
            }
            return;
        })
    }

    query = async (sql, values) => {
        // Learn more about promises
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }

            this.db.execute(sql, values, callback);
        }).catch(err => {
            const errors = Object.keys(HttpStatusCodes);
            err.status = errors.includes(err.code) ? HttpStatusCodes[err.code] : err.status;
            throw err;
        });
    }
}

// We don't need this
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
})

module.exports = new DBConnection().query;