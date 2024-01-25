require("dotenv").config();

const pgp = require("pg-promise")();
const connection = {
    host: process.env.host,
    port: process.env.port,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    ssl: { rejectUnauthorized: false },
};
const db = pgp(connection);

module.exports = db;
