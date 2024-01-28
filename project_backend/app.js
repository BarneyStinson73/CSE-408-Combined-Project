const pgp = require("pg-promise");
const db = require("./db.js");
const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();

const managerRouter = require("./manager.js");

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/manager", managerRouter);

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await db.any(
            `SELECT * FROM "users" WHERE "username" = $1 AND "password" = $2`,
            [username, password]
        );
        // res.json(user);
        let response = {
            message: "Login successful",
            data: user,
        };
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
    }
});
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
