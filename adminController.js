const adminDB = require('../database/adminDB')

const getAdminHomePage = async (req , res) => {
    try{
        const userId = parseInt(req.params.id , 10)
        const adminHomePageData = await adminDB.getHomePageData(userId)
       // console.log(adminHomePageData)
        res.send(adminHomePageData)
    }catch(err){
        console.log(err)
        res.status("Error in fetching Admin homePage")
    }
}

const getAdminProfilePage = async (req , res) => {
    try{
        const userId = parseInt(req.params.id , 10)
        const adminProfileData = await adminDB.getProfilePageData(userId)
        res.send(adminProfileData)
    }
    catch(err){
        res.status(500).send("Error in fetching data of admin profile" + err)
    }
}

const getAdminProjectPage = async (req , res) => {
    try{
        const userId = parseInt(req.params.id , 10)
        const projectId = parseInt(req.params.projectId , 10) 
        // const adminProjectDetailedData = await adminDB.getAdminProjectPageData(userId , projectId)
        // //console.log(adminProjectDetailedData)
        const adminProjectDetailedData = await adminDB.getAdminProjectPageData(userId , projectId)
        //console.log(adminProjectDetailedData)
        //res.send(adminProjectDetailedData)
        //const getSubTasks = await adminDB.getSubTasks(1)
        res.send(adminProjectDetailedData)
    }
    catch(err){
        console.log(err)
        res.status(500).send("Error in fetching details of project" + err)
    }
}

const getAdminTaskPage = async (req , res) => {
    try{
        const userId = parseInt(req.params.id , 10)
        const taskId = parseInt(req.params.taskId , 10)
        const adminTaskPageData = await adminDB.getTaskPageDataforAdmin(userId , taskId)
        res.send(adminTaskPageData.tasksWithSubTasksInfo)
    }
    catch(err){
        res.status(500).send("Error in fetching task data for admin" + err)
    }
}

const getAdminNotificationPage = async (req , res) => {
    try{
        const userId = parseInt(req.params.id , 10)
        const adminNotificationData = await adminDB.getNotificationData(userId)
        res.send(adminNotificationData)
    }
    catch(err){
        res.status(500).send("Error in fetching data of admin notification" + err)
    }
}

const postCommentOfAdminOnTask = async (req , res) => {
    try{
        const userId = parseInt(req.params.id , 10)
        const taskId = parseInt(req.params.taskId , 10)
        const commentMessage = req.body.commentMessage
        //console.log(commentMessage)
        const status = await adminDB.createUserTaskComment(userId , taskId , commentMessage)
        res.send(status)
        
    }
    catch(err){
        console.log(err)
        res.status(500).send("Error in updating new comment" + err)
    }
}

const updateAdminAvailability = async (req , res) => {
    try{
        const userId = parseInt(req.params.id , 10)
        //const availability = req.body.availability
        const status = await adminDB.updateAdminAvailability(userId)
        res.send(status)
    }
    catch(err){
        res.status(500).send("Error in updating availability" + err)
    }
}

const updateTaskDeadlineExtension = async (req , res) => {
    try{
        const userId = parseInt(req.params.id , 10)
        const taskId = parseInt(req.params.taskId , 10)
        const newDeadline = req.body.newDeadline
        const status = await adminDB.updateTaskDeadlineExtension(userId , taskId , newDeadline)
        res.send(status)
    }
    catch(err){
        res.status(500).send("Error in updating task deadline" + err)
    }
}

const updateProjectDeadlineExtension = async (req , res) => {
    try{
        const userId = parseInt(req.params.id , 10)
        const projectId = parseInt(req.params.projectId , 10)
        const newDeadline = req.body.newDeadline
        const status = await adminDB.updateProjectDeadlineExtension(userId , projectId , newDeadline)
        res.send(status)
    }
    catch(err){
        res.status(500).send("Error in updating project deadline" + err)
    }
}


module.exports = {
    getAdminHomePage,
    getAdminProfilePage,
    getAdminProjectPage,
    getAdminTaskPage,
    getAdminNotificationPage,
    updateAdminAvailability,
    postCommentOfAdminOnTask,
    updateTaskDeadlineExtension,
    updateProjectDeadlineExtension
}