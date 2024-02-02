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
    if(!bearerHeader){
        return res.status(403).json({message:"No token provided"});
    }
    try{
        const decoded = jwt.verify(bearerHeader, jwtSecret);
        req.user = decoded;
        // console.log(decoded);
        const currentTime = Math.floor(Date.now()/1000);
        if(decoded.exp < currentTime){
            return res.status(403).json({message:"Token expired"});
        }
        next();
    }
    catch(err){
        console.log(err);
        return res.status(403).json({message:"Invalid token"});
    }
}
function generateToken(user){
    const token = jwt.sign(user, jwtSecret, {expiresIn: "24h"});
    return token;
}
function checkAccountType(type){
    return function(req, res, next){
        if(req.user.type !== type){
            return res.status(403).json({message:"Unauthorized"});
        }
        next();
    }
}

const managerRouter = require("./manager.js");
const projects_router = require("./projects.js");
app.use(express.json());
app.use(cors({ origin: "*" }));

function sha256(message) {
    const hash = crypto.createHash("sha256");
    hash.update(message);
    return hash.digest("hex");
}
app.post("/login", async (req, res) => {
    // console.log(req.body);
    let { username, password } = req.body;
    password = sha256(password);
    // console.log(password);
    // console.log(username);
    try {
        const user = await db.any(
            `SELECT * FROM "User" WHERE "userName" = $1 AND "password" = $2`,
            [username, password]
        );
        // res.json(user);
        // console.log(user);
        // console.log(user[0].userId);
        const token = generateToken({userId: user[0].userId, type: user[0].type});
        let response = {
            message: "Login successful",
            token: token,
            data: user[0],
        };
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Invalid credentials" });
    }
});
app.post("/register", async (req, res) => {
    let { username, password, email, contact, position, type } = req.body;
    password = sha256(password);
    try {
        const user = await db.any(
            `INSERT INTO "User" ("userName", "password","email","contactNo","position","type") VALUES ($1, $2,$3,$4,$5,$6) RETURNING "userId"`,
            [username, password, email, contact, position, type]
        );
        // res.json(user);
        let response = {
            message: "Registration successful",
            data: user,
        };
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
    }
});


app.use("/manager", verifyToken, checkAccountType("admin"),managerRouter);
app.use("/projects", verifyToken, projects_router);
// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//     // console.log(req);
//     console.log(req.url);

//     // set header content type
//     res.setHeader("Content-Type", "text/html");

//     // routing
//     let path = "./views/";
//     switch (req.url) {
//         case "/":
//             path += "index.html";
//             res.statusCode = 200;
//             break;
//         case "/about":
//             path += "about.html";
//             res.statusCode = 200;
//             break;
//         case "/about-us":
//             res.statusCode = 301;
//             res.setHeader("Location", "/about");
//             res.end();
//             break;
//         default:
//             path += "404.html";
//             res.statusCode = 404;
//     }

//     // send html
//     fs.readFile(path, (err, data) => {
//         if (err) {
//             console.log(err);
//             res.end();
//         }
//         //res.write(data);
//         res.end(data);
//     });
// });

// localhost is the default value for 2nd argument
app.listen(3000, "localhost", () => {
    console.log("listening for requests on port 3000");
});
