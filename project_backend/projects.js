const router = require("express").Router();
const db = require("./db.js");

router.route("/").post((req, res) => {
    // const bearerHeader = req.headers["authorization"];
    // if (!bearerHeader) {
    //     return res.status(403).json({ message: "No token provided" });
    // }
    // const decoded = jwt.verify(bearerHeader, jwtSecret);

    // let id = decoded["userId"];
    // console.log(decoded);
    let id=req.user["userId"];
    
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
