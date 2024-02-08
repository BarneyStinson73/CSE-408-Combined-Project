const router = require("express").Router();
const { as } = require("pg-promise");
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

router.route("/project_creation_form").post((req, res) => {
    Promise.all([
    db.any(`SELECT * FROM "User" WHERE "type" = 'admin'`),
    db.any(`SELECT * FROM "Tags"`),
    db.any(`SELECT * FROM "User" WHERE "type" <> 'admin'`)
    ])

        .then(([managers,tags,users]) => {
            let response = {
                message: "Project created successfully",
                managers: managers,
                tags: tags,
                users: users
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/create_project").post(async (req, res) => {
    let { project_name, project_manager, project_tags, project_users,start_date,deadline } = req.body;
    
    let data = await db.any(`INSERT INTO "Project" ("projectName","startTime","deadline") VALUES ($1, $2, $3) returning "projectId"`,
        [project_name, start_date, deadline]);
    await db.any(`INSERT INTO "ProjectManager" ("projectId","userId") VALUES ($1, $2)`,
        [data[0].projectId, project_manager]);
    project_tags.forEach(async (tag) => {
        await db.any(`INSERT INTO "ProjectTag" ("projectId","tagId") VALUES ($1, $2)`,
            [data[0].projectId, tag]);
    });
    project_users.forEach(async (user) => {
        await db.any(`INSERT INTO "ProjectUser" ("projectId","userId") VALUES ($1, $2)`,
            [data[0].projectId, user]);
    });
    let response = {
        message: "Project created successfully",
        data: data,
    };
    res.status(200).json(response);
});

router.route("/task_creation_form").post(async (req, res) => {
    await db.any(`SELECT * FROM "User" WHERE "type" = 'admin'`),
    await db.any(`SELECT * FROM "Tags"`),
    await db.any(`SELECT * FROM "User" WHERE "type" <> 'admin'`)
        .then(([managers,tags,users]) => {
            let response = {
                message: "Task created successfully",
                managers: managers,
                tags: tags,
                users: users
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/create_task").post(async (req, res) => {
    let {
        project_name,
        project_manager,
        project_tags,
        project_users,
        start_date,
        deadline,
    } = req.body;

    let data = await db.any(
        `INSERT INTO "Task" ("taskName","startTime","deadline") VALUES ($1, $2, $3) returning "projectId"`,
        [project_name, start_date, deadline]
    );
    await db.any(
        `INSERT INTO "ProjectManager" ("projectId","userId") VALUES ($1, $2)`,
        [data[0].projectId, project_manager]
    );
    project_tags.forEach(async (tag) => {
        await db.any(
            `INSERT INTO "ProjectTag" ("projectId","tagId") VALUES ($1, $2)`,
            [data[0].projectId, tag]
        );
    });
    project_users.forEach(async (user) => {
        await db.any(
            `INSERT INTO "ProjectUser" ("projectId","userId") VALUES ($1, $2)`,
            [data[0].projectId, user]
        );
    });
    let response = {
        message: "Project created successfully",
        data: data,
    };
    res.status(200).json(response);
});


router.route("/projects/tasks").post((req, res) => {
    let {project_id} = req.body;
    console.log(project_id);
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

// if else statement to check if the project or task we are trying to access has its leaf flag set to true

module.exports = router;
