const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController')

// get requests for admin
router.get('/:id/homepage' , adminController.getAdminHomePage)
router.get('/:id/profile' , adminController.getAdminProfilePage)
router.get('/:id/project/:projectId' , adminController.getAdminProjectPage)
router.get('/:id/task/:taskId' , adminController.getAdminTaskPage)
router.get('/:id/notification' , adminController.getAdminNotificationPage)


router.post('/:id/task/:taskId/comment' , adminController.postCommentOfAdminOnTask)
router.post('/:id/profile/toggleAvailibility' , adminController.updateAdminAvailability)
router.post('/:id/project/:projectId/deadlineExtension' , adminController.updateProjectDeadlineExtension)
router.post('/:id/task/:taskId/deadlineExtension' , adminController.updateTaskDeadlineExtension)



// post request for admin
/*
1.Update Profile
2.Update Password
3.Update Availability
4.Create New Project
    i.Insert in project Table
    ii.Update projectManager
    iii.Update ProjectTag
    iv.New Notification created
    v.Notification relational table will be updated
5.Create Task under Project
    i.Insert in Task table
    ii.Update projectTask
    iii.Task manager
    iv.update task tag
    v.dependency task
    vi.Notification
    vii.notification relational table update
6.Create Task under Task
    i.insert into task
    ii.task manager update
    iii.update task tag
    iv.update subtask
    v.update dependency task
    vi.notification
    vii.notification relational table update
    viii.Task assignment request will be generated
7.Comment in task
    i.A new comment will be generated
    ii.comment relational schema will be updated
8.Kanban Push
    Yet to think
9.Task deadline Extension
    i.Update task table
10.Project deadline Extension 
    i.Update project table
*/


// delete request for admin


module.exports = router
