const userDB = require('../database/userDB')

const getUserProfile = async (req , res) =>{
    try{
        const userId = parseInt(req.params.id , 10)
        const profile = await userDB.userProfile(userId)
        // console.log(typeof(profile))
        res.send(profile)

    }
    catch(err){
        console.log(err)
        res.status(500).send("Error in data fetching for profile"+ err)
    }
}

const getUserHomePage = async (req , res) =>{
    try{
        const userId = parseInt(req.params.id , 10)
        const homepageData = await userDB.userHomePageData(userId)
        res.send(homepageData)
    }catch(err){
        res.status(500).send("Error in fetching homepage data" + err);
    }
}

const updateUserProfile= async (req , res) => {
    try{
        const userId = parseInt(req.params.id , 10)
        const userProfileObj = req.body
        console.log(req.body)
        //console.log(newName)
        const updatedUser = await userDB.updateUserProfileData(userId , userProfileObj)
        res.send(updatedUser)
    }catch(err){
        res.status(500).send("Error in Updating username" + err);
    }
}

const getUserTaskCommentPage = async (req , res) => {
    try{
        const userId = parseInt(req.params.id , 10)
        const taskId = parseInt(req.params.taskId , 10)
        const userTaskCommentPageData = await userDB.getUserTaskComment(userId , taskId)
        res.send(userTaskCommentPageData)
    }
    catch(err){
        res.status(500).send("Error in fetching usertaskcomment" + err)
    }
}

const getUserNotificationPage = async (req , res) => {
    const userId = parseInt(req.params.id , 10)
    const userNotificationData = await userDB.getUserNotificationData(userId)
    res.send(userNotificationData)
}

const postApproveTaskAssignmentReq = async (req , res) => {
    const userId = parseInt(req.params.id , 10)
    const taskId = parseInt(req.body.taskId , 10)
    const managerId = parseInt(req.body.managerId , 10)
    const approveTaskAssignmentReqData = await userDB.approveTaskAssignmentRequest(userId , taskId , managerId)
    res.send(approveTaskAssignmentReqData)
}

const postIgnoreTaskAssignmentReq = async (req , res) => {
    const userId = parseInt(req.params.id , 10)
    const taskId = parseInt(req.body.taskId , 10)
    const managerId = parseInt(req.body.managerId , 10)
    const ignoreTaskAssignmentReqData = await userDB.ignoreTaskAssignmentRequest(userId , taskId , managerId)
    res.send(ignoreTaskAssignmentReqData)
}

const postUpdateUserTaskProgression = async (req , res) => {    
    const userId = parseInt(req.params.id , 10)
    const taskId = parseInt(req.body.taskId , 10)
    console.log(typeof(taskId))
    //console.log(taskId)
    //const progression = parseInt(req.body.progression , 10)
    const updatedTaskProgressionData = await userDB.updateUserTaskProgression(userId , taskId)
    res.send(updatedTaskProgressionData)
}

const createCommentofUser = async (req , res) => {
    const userId = parseInt(req.params.id , 10)
    const taskId = parseInt(req.params.taskId , 10)
    const comment = req.body.commentMessage
    const commentData = await userDB.createUserTaskComment(userId , taskId , comment)
    res.send(commentData)
}

const deleteCommentofUser = async (req , res) => {
    const userId = parseInt(req.params.id , 10)
    const taskId = parseInt(req.params.taskId , 10)
    const commentId = parseInt(req.params.commentId , 10)
    const commentData = await userDB.deleteCommentofUserTask(userId , taskId , commentId)
    res.send(commentData)
}
module.exports = {
    getUserProfile,
    getUserHomePage,
    updateUserProfile,
    getUserTaskCommentPage,
    getUserNotificationPage,
    postApproveTaskAssignmentReq,
    postIgnoreTaskAssignmentReq,
    postUpdateUserTaskProgression,
    createCommentofUser,
    deleteCommentofUser
}