// const crypto = require("crypto");

// function sha256(message) {
//     const hash = crypto.createHash("sha256");
//     hash.update(message);
//     return hash.digest("hex");
// }

// // Example usage
// const messageToHash = "Hello, World!";
// const hash = sha256(messageToHash);
// console.log(`Message: ${messageToHash}`);
// console.log(`SHA-256 Hash: ${hash}`);

const pgp = require("pg-promise");
const db = require("./db.js");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT;

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(403).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(bearerHeader, jwtSecret);
        req.user = decoded;
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            return res.status(403).json({ message: "Token expired" });
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: "Invalid token" });
    }
}

function generateToken(user) {
    const token = jwt.sign(user, jwtSecret, { expiresIn: "24h" });
    return token;
}
