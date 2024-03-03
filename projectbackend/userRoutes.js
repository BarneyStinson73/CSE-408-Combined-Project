const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')


//get request of user

router.get('/:id/homepage/', userController.getUserHomePage)
router.get('/:id/profile', userController.getUserProfile)
// router.post('/:id/profile/update' , userController.updateUserName)
router.get('/:id/task/:taskId' , userController.getUserTaskCommentPage)
router.get('/:id/notification',userController.getUserNotificationPage)
//router.get(':id/notifications/', userController.getUserNotification)

//post request of user
router.post('/:id/profile/update' , userController.updateUserProfile)
router.post('/:id/profile/approveTaskAssignmentReq' , userController.postApproveTaskAssignmentReq)
router.post('/:id/profile/ignoreTaskAssignmentReq' , userController.postIgnoreTaskAssignmentReq)
router.post('/:id/profile/updateTaskProgression' , userController.postUpdateUserTaskProgression)
router.post('/:id/task/:taskId/comment' , userController.createCommentofUser)
router.post('/:id/task/:taskId/comment/:commentId/delete' , userController.deleteCommentofUser)

//post req of user
/*
1.Update profile
2.Update password
3.Update Avalibility
4.Update task Assignment req
    i.On approve 
        a.insert in taskEmployee 
        b.remove from taskAssignmentReq
        c.A notification will be generated
        d.new notification will be send to manager
        e.notification relational schema will be updated
    ii.On ignore
        a.remove from taskAssignmentReq
        b.A notification will be generated
        c.new notification will be send to manager
        d.notification relational schema will be updated
5.Update self task progression 
    i.update progression field of the task
    ii.update progression field of the parent tasks recursively
    iii.A new notification will be generated
    iv.notification will be send to all people involved in that task
    v.notification relational schema will be updated
6.Comment in task
    i.A new comment will be generated
    ii.comment relational schema will be updated
*/





module.exports = router;