const router = require("express").Router();
const db = require("./db.js");

router.route("/").post((req, res) => {
    let id = req.body.id;

    db.any(`SELECT * FROM "ProjectUser" WHERE "id" = $1`, [id])
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
