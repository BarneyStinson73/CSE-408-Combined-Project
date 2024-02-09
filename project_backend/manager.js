const router = require("express").Router();
const { as } = require("pg-promise");
const db = require("./db.js");



const kanbanRouter = require("./kanban.js");
app.use(express.json());
app.use(cors({ origin: "*" }));


router.route("/profile").post(async (req, res) => {
    let id = req.user["userId"];

    let user_data=await db.any(`SELECT * FROM "User" WHERE "userId" = $1`, [id]);
    let  project_data  = await db.any(
        `
            SELECT 
                p."projectId",
                p."progression",
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
                user_data:user_data,
                project_data:project_data
            };
            console.log(response);
            res.status(200).json(response);
        } catch (err) {
            console.log(err);
        }
});

router.route("/update_profile").post((req, res) => {
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

router.route("/update_password").post((req, res) => {
    let id = req.user["userId"];

    let { prev_password,new_password } = req.body;
    db.any(
        `UPDATE "User" SET "password" = $1 WHERE "userId" = $2`,
        [ new_password, id]
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
                message: "Project creation form sent successfully",
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
    // let {parent_project_user_list} = req.body;
    let {project_id}=req.body;
    // await db.any(`SELECT * FROM "User" WHERE "type" = 'admin'`),
    // await db.any(`SELECT * FROM "Tags"`),
    // await db.any(`SELECT * FROM "User" WHERE "type" <> 'admin'`)
    let {parent_project_user_list}=await db.any(`SELECT "userId" from "ProjectUser" where projectId='$1'`,[project_id]);
    let {task_managers}=await db.any(`SELECT "userId" FROM "ProjectUser" WHERE "projectId" = $1`,[project_id]);
    let {tags}=await db.any(`SELECT "taskId" FROM "ProjectTag" WHERE "projectId" = $1`,[project_id]);
        // .then(([task_managers,tags,parent_project_user_list]) => {
        //     let response = {
        //         message: "Task creation form sent successfully",
        //         managers: task_managers ,
        //         tags: tags,
        //         users: parent_project_user_list
        //     };
        //     res.status(200).json(response);
        // })
        // .catch((err) => {
        //     console.log(err);
        // });
    let response = {
        message: "Task creation form sent successfully",
        managers: task_managers ,
        tags: tags,
        users: parent_project_user_list
    };
    res.status(200).json(response);
});

router.route("/task/create_task").post(async (req, res) => {
    let {
        parent_id,
        task_name,
        task_manager,
        task_users,
        start_date,
        deadline,
    } = req.body;

    let data = await db.any(
        `INSERT INTO "Task" ("taskName","startTime","deadline") VALUES ($1, $2, $3) returning "tasktId"`,
        [task_name, start_date, deadline]
    );
    await db.any(
        `INSERT INTO "TaskManager" ("taskId","userId") VALUES ($1, $2)`,
        [data[0].taskId, task_manager]
    );
    task_users.forEach(async (user) => {
        await db.any(
            `INSERT INTO "ProjectUser" ("projectId","userId") VALUES ($1, $2)`,
            [data[0].projectId, user]
        );
    });
    let response = {
        message: "Task created successfully",
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


router.route("/notifications").post((req, res) => {
    let {id} = req.body;
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

// if else statement to check if the project or task we are trying to access has its leaf flag set to true 

router.route("/project/task/details").post(async(req, res) => {
    let {task_id} = req.body;
    
} );



module.exports = router;
