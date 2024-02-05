const router = require("express").Router();
const db = require("./db.js");

router.route("/profile").post((req, res) => {
    // const bearerHeader = req.headers["authorization"];
    // if (!bearerHeader) {
    //     return res.status(403).json({ message: "No token provided" });
    // }
    // const decoded = jwt.verify(bearerHeader, jwtSecret);

    // let id = decoded["userId"];
    // console.log(decoded);
    let id = req.user["userId"];

    db.any(`SELECT * FROM "User" WHERE "userId" = $1`, [id])
        .then((data) => {
            let response = {
                message: "User profile retrieved successfully",
                data: data,
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/update_profile").post((req, res) => {
    // const bearerHeader = req.headers["authorization"];
    // if (!bearerHeader) {
    //     return res.status(403).json({ message: "No token provided" });
    // }
    // const decoded = jwt.verify(bearerHeader, jwtSecret);

    // let id = decoded["userId"];
    // console.log(decoded);
    let id = req.user["userId"];

    let { username, email, password } = req.body;
    db.any(
        `UPDATE "User" SET "userName" = $1, "email" = $2, "password" = $3 WHERE "userId" = $4`,
        [username, email, password, id]
    )
        .then((data) => {
            let response = {
                message: "User profile updated successfully",
                data: data,
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});
router.route("/projects/tasks").get((req, res) => {
    let project_id = req.body;
    db.any(`SELECT * FROM "ProjectTask" WHERE "projectId" = $1`, [project_id])
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
