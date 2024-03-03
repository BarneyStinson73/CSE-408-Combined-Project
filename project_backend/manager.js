const router = require("express").Router();
const { as } = require("pg-promise");
const db = require("./db.js");

const crypto = require("crypto");
function sha256(message) {
    const hash = crypto.createHash("sha256");
    hash.update(message);
    return hash.digest("hex");
}

const kanbanRouter = require("./kanban.js");

router.route("/homepage").post(async (req, res) => {
    let id = req.user["userId"];
    let person = await db.any(
        `SELECT "userName","position" FROM "User" WHERE "userId" = $1`,
        [id]
    );
    let reminders = await db.any(
        `SELECT 
        p."projectName" || ',' || t."taskName" as header,
        n."notificationMessage" as message,
        n."notificationType",
        un."creationTime"
    FROM "Notifications" n
    JOIN "UserTaskNotification" un ON n."notificationId" = un."notificationId"
    JOIN "Task" t ON un."taskId" = t."taskId"
    JOIN "ProjectTask" pt ON t."taskId" = pt."taskId"
    JOIN "Project" p ON pt."projectId" = p."projectId"
    WHERE un."userId" = $1
    AND n."notificationType" = 1`,
        [id]
    );

    //send these as responses in try-catch block
    try {
        let response = {
            message: "Homepage data retrieved successfully",
            reminders: reminders,
            person: person,
            // header:header
        };
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving homepage data" });
    }
});

router.route("/profile").post(async (req, res) => {
    try {
        let id = req.user["userId"];

        // Retrieve user data
        let user_data = await db.any(
            `SELECT * FROM "User" WHERE "userId" = $1`,
            [id]
        );

        // Retrieve project data along with associated tags and their counts
        let project_data = await db.any(
            `
            SELECT 
                p."projectId",
                p."progression",
                p."projectName",
                p."deadline",
                ARRAY_AGG(u."userId") AS involvedUsers,
                JSONB_OBJECT_AGG(tag_count.tn, tag_count.tagCount) AS tagCounts
            FROM 
                "Project" p
            JOIN 
                "ProjectUser" pu ON p."projectId" = pu."projectId"
            JOIN 
                "ProjectUser" u ON u."projectId" = p."projectId"
            LEFT JOIN (
                SELECT 
                    pt."projectId",
                    "Tags"."tagName" AS tn,
                    COUNT(*) AS tagCount
                FROM 
                    "ProjectTag" pt
                JOIN 
                    "Tags" ON pt."tagId" = "Tags"."tagId"
                GROUP BY 
                    pt."projectId", "Tags"."tagName"
            ) AS tag_count ON tag_count."projectId" = p."projectId"
            WHERE 
                pu."userId" = $1
            GROUP BY 
                p."projectId", p."progression", p."projectName", p."deadline"
        `,
            [id]
        );

        // Extract tag data from the project data
        let tag_data = project_data.map((project) => {
            return {
                projectId: project.projectId,
                tagCounts: project.tagCounts,
            };
        });

        let response = {
            message: "User profile retrieved successfully",
            user_data: user_data,
            project_data: project_data,
            tag_data: tag_data,
        };

        console.log(response);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving user profile" });
    }
});

router.route("/update_profile").post((req, res) => {
    let id = req.user["userId"];

    let { username, email, contact } = req.body;
    // password=sha256(password);
    db.any(
        `UPDATE "User" SET "userName" = $1, "email" = $2 ,"contactNo"=$3 WHERE "userId" = $4`,
        [username, email, contact, id]
    )
        .then((data) => {
            let response = {
                message: "User profile updated successfully",
                data: data,
                success: true,
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/update_password").post(async (req, res) => {
    let id = req.user["userId"];

    let { prev_password, new_password } = req.body;
    new_password = sha256(new_password);
    // check whether previous password is correct
    let old_pass = await db.any(`SELECT * FROM "User" WHERE "userId" = $1`, [
        id,
    ]);
    old_pass = old_pass[0].password;
    prev_password = sha256(prev_password);
    if (old_pass != prev_password) {
        let response = {
            message: "Previous password is incorrect",
        };
        res.status(200).json(response);
        return;
    }

    db.any(`UPDATE "User" SET "password" = $1 WHERE "userId" = $2`, [
        new_password,
        id,
    ])
        .then((data) => {
            let response = {
                message: "User password updated successfully",
                data: data,
                success: true,
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
        db.any(`SELECT * FROM "User" WHERE "type" <> 'admin'`),
    ])

        .then(([managers, tags, users]) => {
            let response = {
                message: "Project creation form sent successfully",
                managers: managers,
                tags: tags,
                users: users,
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/create_project").post(async (req, res) => {
    let {
        project_name,
        project_manager,
        project_tags,
        project_users,
        project_special_users,
        start_date,
        deadline,
    } = req.body;

    let data = await db.any(
        `INSERT INTO "Project" ("projectName","startTime","deadline") VALUES ($1, $2, $3) returning "projectId"`,
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
    project_special_users.forEach(async (user) => {
        await db.any(
            `INSERT INTO "ProjectUser" ("projectId","userId") VALUES ($1, $2)`,
            [data[0].projectId, user]
        );
    });

    await db.any(
        // insert start date and deadline into project table where project id =date[0].projectid
        `UPDATE "Project" SET "startTime" = $1, "deadline" = $2 WHERE "projectId" = $3`,
        [start_date, deadline, data[0].projectId]
    );

    let response = {
        message: "Project created successfully",
        data: data,
        success: true,
    };
    res.status(200).json(response);
});

router.route("/task_creation_form_project").post(async (req, res) => {
    // let {parent_project_user_list} = req.body;
    let { project_id } = req.body;
    // await db.any(`SELECT * FROM "User" WHERE "type" = 'admin'`),
    // await db.any(`SELECT * FROM "Tags"`),
    // await db.any(`SELECT * FROM "User" WHERE "type" <> 'admin'`)
    let parent_project_user_list = await db.any(
        `SELECT "userId" from "ProjectUser" where projectId='$1'`,
        [project_id]
    );
    let task_managers = await db.any(
        `SELECT "userId" FROM "ProjectUser" WHERE "projectId" = $1 AND "type" = 'admin'`,
        [project_id]
    );
    let tags = await db.any(
        `SELECT "taskId" FROM "ProjectTag" WHERE "projectId" = $1`,
        [project_id]
    );
    let response = {
        message: "Task creation form for project sent successfully",
        managers: task_managers,
        tags: tags,
        users: parent_project_user_list,
    };
    res.status(200).json(response);
});

router.route("/task_creation_form_task").post(async (req, res) => {
    let { task_id } = req.body;
    let task_managers = await db.any(
        `SELECT * FROM "TaskManager" WHERE "taskId" = $1`,
        [task_id]
    );
    let tags = await db.any(`SELECT * FROM "TaskTag" WHERE "taskId" = $1`, [
        task_id,
    ]);
    let task_users = await db.any(
        `SELECT * FROM "TaskEmployee" WHERE "taskId" = $1`,
        [task_id]
    );
    let response = {
        message: "Task creation form for task sent successfully",
        managers: task_managers,
        tags: tags,
        users: task_users,
    };
    res.status(200).json(response);
});

router.route("/project/create_task").post( async (req, res) => {
    let {
        project_id,
        task_name,
        task_manager,
        task_tags,
        task_users,
        task_dependency,
        start_date,
        deadline,
    } = req.body;

    let data = await db.any(
        `INSERT INTO "Task" ("taskName","startTime","deadline") VALUES ($1, $2, $3) returning "taskId"`,
        [task_name, start_date, deadline]
    );
    await db.any(
        `INSERT INTO "TaskManager" ("taskId","userId") VALUES ($1, $2)`,
        [data[0].taskId, task_manager]
    );
    task_users.forEach(async (user) => {
        await db.any(
            `INSERT INTO "TaskEmployee" ("projectId","taskId","userId") VALUES ($1, $2,$3)`,
            [project_id, data[0].taskId, user]
        );
    });
    task_tags.forEach(async (tag) => {
        await db.any(
            `INSERT INTO "TaskTag" ("taskId","tagId") VALUES ($1, $2)`,
            [data[0].taskId, tag]
        );
    });
    task_dependency.forEach(async (dependency) => {
        await db.any(
            `INSERT INTO "DependentTask" ("masterId","dependentId") VALUES ($1, $2)`,
            [dependency, data[0].taskId]
        );
    });
    let response = {
        message: "Task created successfully",
        data: data,
    };
    res.status(200).json(response);
});

router.route("/task/create_task").post(async (req, res) => {
    let {
        parent_task_id,
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
    let { project_id } = req.body;
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
    let id = req.user["userId"];
    console.log(id);
    db.any(
        `SELECT n."notificationMessage", n."notificationType", un."creationTime", un."taskId"
      FROM "Notifications" n
      JOIN "UserTaskNotification" un ON n."notificationId" = un."notificationId"
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

router.route("/project/retrieve_task_from_task").post(async (req, res) => {
    let { task_id } = req.body;
    await db
        .any(`SELECT * FROM "Task" WHERE "parentId" = $1`, [task_id])
        .then((data) => {
            let response = {
                message: "Task details retrieved successfully",
                data: data,
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/project/retrieve_task_from_project").post(async (req, res) => {
    let { project_id } = req.body;
    await db
        .any(`SELECT * FROM "ProjectTask" WHERE "projectId" = $1`, [project_id])
        .then((data) => {
            let response = {
                message: "Task details retrieved successfully",
                data: data,
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.route("/project_admins").post(async (req, res) => {
    let { project_id } = req.body;
    await db
        .any(
            `SELECT "User"."userId", "User"."userName" FROM "ProjectUser" INNER JOIN "User" ON "ProjectUser"."userId" = "User"."userId" WHERE "ProjectUser"."projectId" = $1 AND "User"."type" = 'admin'`,
            [projectId]
        )
        .then((data) => {
            let response = {
                message: "Project admins retrieved successfully",
                data: data,
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
        });
});


router.route("/task_admins").post(async (req, res) => {
    let { task_id } = req.body;

    try {
        const data = await db.any(
            `SELECT "User"."userId", "User"."userName"
       FROM "TaskEmployee"
       INNER JOIN "User" ON "TaskEmployee"."userId" = "User"."userId"
       WHERE "TaskEmployee"."taskId" = $1 AND "User"."type" = 'admin'`,
            [task_id]
        );

        const response = {
            message: "Task admins retrieved successfully",
            data: data,
        };
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving task admins" });
    }
});
router.route("/task_tags").post(async (req, res) => {
    let { task_id } = req.body;
    try {
        const data = await db.any(
            `SELECT "Tags"."tagId", "Tags"."tagName"
         FROM "TaskTag"
            INNER JOIN "Tags" ON "TaskTag"."tagId" = "Tags"."tagId"
            WHERE "TaskTag"."taskId" = $1`,
            [task_id]
        );

        const response = {
            message: "Task tags retrieved successfully",
            data: data,
        };
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving task tags" });
    }
});

router.route("/task_collaborators").post(async (req, res) => {
    let { task_id } = req.body;

    try {
        const data = await db.any(
            `SELECT "User"."userId", "User"."userName"
       FROM "TaskEmployee"
       INNER JOIN "User" ON "TaskEmployee"."userId" = "User"."userId"
       WHERE "TaskEmployee"."taskId" = $1`,
            [task_id]
        );

        const response = {
            message: "Task collaborators retrieved successfully",
            data: data,
        };
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving task employees" });
    }
} );
router.route("/project/kanban_breadcrumb").post(async (req, res) => {
    let { task_id } = req.body;

    // Enhanced query with recursive CTE (Common Table Expression)
    let data = await db.any(
        `
        WITH RECURSIVE children AS (
            SELECT 
                t1."taskId", 
                t1."taskName", 
                t1."progression", 
                t1."startTime", 
                t1."endTime", 
                t1."deadline", 
                t1."parentId", 
                t1."isLeaf",
                dt."dependentId" AS dependency
            FROM "Task" t1
            LEFT JOIN "DependentTask" dt ON t1."taskId" = dt."masterId"
            WHERE t1."taskId" = $1
            UNION ALL
            SELECT 
                c2."taskId", 
                c2."taskName", 
                c2."progression", 
                c2."startTime", 
                c2."endTime", 
                c2."deadline", 
                c2."parentId", 
                c2."isLeaf",
                dt2."dependentId" AS dependency
            FROM children c1
            INNER JOIN "Task" c2 ON c1."taskId" = c2."parentId"
            LEFT JOIN "DependentTask" dt2 ON c2."taskId" = dt2."masterId"
        )
        SELECT * FROM children
        `,
        [task_id]
    );

    let response = {
        message: "Gantt data retrieved successfully",
        data: data,
    };
    res.status(200).json(response);
});

router.route("/task_details").post(async (req, res) => {
    let { task_id } = req.body;
    let data = await db.any(`SELECT * FROM "Task" WHERE "parentId" = $1`, [
        task_id,
    ]);
    console.log(data);
    let response = {
        message: "Task details retrieved successfully",
        data: data,
    };
    res.status(200).json(response);
});
router.route("/project_task_details").post(async (req, res) => {
    console.log(req.body);
    let { project_id } = req.body;
    try {
        let data = await db.any(
            `SELECT p."taskId", p."projectId", t."taskName", t."progression", t."deadline", t."parentId",t."isLeaf"
FROM "ProjectTask" p INNER JOIN "Task" t ON p."taskId" = t."taskId" WHERE p."projectId" = $1`,
            [project_id]
        );
        let response = {
            message: "Project details retrieved successfully",
            data: data,
        };
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error retrieving project details" });
    }
});


router.route("/all_leaf_tasks").post(async (req, res) => {
    let { task_id } = req.body;

    // Define an object to store the response data
    let response = {
        todo: [],
        inprogress: [],
        completed: [],
    };

    try {
        // Execute all three queries using Promise.all
        const [todoData, inprogressData, completedData] = await Promise.all([
            db.any(
                `SELECT * FROM "Task" WHERE "parentId" = $1 AND "progression" = 0`,
                [task_id]
            ),
            db.any(
                `SELECT * FROM "Task" WHERE "parentId" = $1 AND "progression" > 0 AND "progression" < 100`,
                [task_id]
            ),
            db.any(
                `SELECT * FROM "Task" WHERE "parentId" = $1 AND "progression" = 100`,
                [task_id]
            ),
        ]);

        // Assign retrieved data to corresponding properties in the response object
        response.todo = todoData;
        response.inprogress = inprogressData;
        response.completed = completedData;

        res.status(200).json({
            message: "Tasks retrieved successfully",
            data: response,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving tasks" });
    }
});

router.route("/change_to_completed").post(async (req, res) => {
    let { task_id } = req.body;
    let data = await db.any(
        `UPDATE "Task" SET "progression" = 100 WHERE "taskId" = $1`,
        [task_id]
    );
    let response = {
        message: "Task pushed to completed successfully",
        data: data,
    };
    res.status(200).json(response);
});


router.route("/change_to_progress").post(async (req, res) => {
    let { task_id } = req.body;

    try {
        // Recursive query to find all upstream dependencies (ancestor tasks)
        const query = `
            WITH RECURSIVE upstream_tasks AS (
                SELECT "masterId", "dependentId"
                FROM "DependentTask"
                WHERE "dependentId" = $1
                UNION
                SELECT d."masterId", d."dependentId"
                FROM "DependentTask" d
                JOIN upstream_tasks ut ON ut."masterId" = d."dependentId"
            )
            SELECT "taskId" FROM "Task" t
            JOIN upstream_tasks ut ON t."taskId" = ut."masterId"
            WHERE t."progression" < 100;
        `;

        const unfinishedDependencies = await db.any(query, [task_id]);

        // If there are unfinished upstream tasks, reject the update
        if (unfinishedDependencies.length > 0) {
            return res.status(200).json({
                message:
                    "Cannot proceed to in progress. There are unfinished upstream dependent tasks.",

                failure: true,
            });
        }

        // If all dependencies are finished, update the task progression
        await db.any(
            `UPDATE "Task" SET "progression" = 25 WHERE "taskId" = $1`,
            [task_id]
        );

        // Respond with success message
        res.status(200).json({
            message: "Task pushed to in progress successfully",
        });
    } catch (error) {
        console.error("Error updating task progression:", error);
        res.status(500).json({
            message: "Internal server error",
            failure: true,
        });
    }
});

module.exports = router;
