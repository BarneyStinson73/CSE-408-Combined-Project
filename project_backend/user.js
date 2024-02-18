const router = require("express").Router();
const { as } = require("pg-promise");
const db = require("./db.js");

const kanbanRouter = require("./kanban.js");
// app.use(express.json());
// app.use(cors({ origin: "*" }));

router.route("/profile").post(async (req, res) => {
    let id = req.user["userId"];

    let user_data = await db.any(`SELECT * FROM "User" WHERE "userId" = $1`, [
        id,
    ]);
    let project_data = await db.any(
        `
            SELECT 
                p."projectId",
                p."progression",
                p."projectName",
                p."deadline",
                ARRAY_AGG(u."userId") AS involvedUsers
            FROM 
                "Project" p
            JOIN 
                "ProjectUser" pu ON p."projectId" = pu."projectId"
            JOIN 
                "ProjectUser" u ON u."projectId" = p."projectId"
            WHERE 
                pu."userId" = $1
            GROUP BY 
                p."projectId", p."progression";
        `,
        [id]
    );
    try {
        let response = {
            message: "User profile retrieved successfully",
            // data: data,
            user_data: user_data,
            project_data: project_data,
        };
        console.log(response);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
    }
});

router.route("/update_profile").post((req, res) => {
    let id = req.user["userId"];

    let { username, email } = req.body;
    // password=sha256(password);
    db.any(
        `UPDATE "User" SET "userName" = $1, "email" = $2 WHERE "userId" = $3`,
        [username, email, id]
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

router.route("/update_password").post((req, res) => {
    let id = req.user["userId"];

    let { prev_password, new_password } = req.body;
    new_password = sha256(new_password);
    db.any(`UPDATE "User" SET "password" = $1 WHERE "userId" = $2`, [
        new_password,
        id,
    ])
        .then((data) => {
            let response = {
                message: "User password updated successfully",
                data: data,
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});
router.route("/notifications").post((req, res) => {
    let { id } = req.body;
    db.any(
        `SELECT n."notificationMessage", n."notificationType", n."creationTime", un."taskId"
      FROM "Notifications" n
      JOIN "UserNotification" un ON n."notificationId" = un."notificationId"
      WHERE un."userId" = $1;`,
        [id]
    )
        .then((data) => {
            let response = {
                message: "Notifications retrieved successfully",
                data: data,
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});


module.exports = router;