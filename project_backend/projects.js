const router = require("express").Router();
const pgp = require("pg-promise");
const db = require("./db.js");
const express = require("express");
const app = express();
const cors = require("cors");
// const router = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT;

router.route("/").post((req, res) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(403).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(bearerHeader, jwtSecret);

    let id = decoded["userId"];
    console.log(decoded);
    
    db.any(`SELECT * FROM "ProjectUser" WHERE "userId" = $1`, [id])
        .then((data) => {
            let response = {
                message: "Projects retrieved successfully",
                data: data,
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });

});

module.exports = router;
