const router = require("express").Router();
const db = require("./db.js");

// router.route("/projects/tasks").post((req, res) => {
//     let {project_id} = req.body;
//     console.log(project_id);
//     db.any(`SELECT * FROM "ProjectTask" WHERE "projectId" = $1`, [project_id])
//         .then((data) => {
//             let response = {
//                 message: "Project tasks retrieved successfully",
//                 data: data,
//             };
//             res.status(200).json(response);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

router.route("/").post(async(req,res)=>{
    let {taskId}=req.body;
    console.log(taskId);
    db.any(`SELECT * FROM "Task" WHERE "parentId"=$1`,[taskId])
        .then((data)=>{
            let response={
                message:"Kanban Data Brought Successfully",
                data:data,
            };
            res.status(200).json(response);
        })
        .catch((err)=>{
            console.log(err);
        });
});