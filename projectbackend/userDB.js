const prisma = require('./prismaClient')

//get user profile page data
async function userProfile(userId){
    // return userId;
     const userProfile_userInfo = await prisma.user.findUnique(
        {
            where:
            {
                userId: userId,
            },
            select:{
                userId:true,
                userName:true,
                contactNo:true,
                email:true,
                isAvailable:true,
                position:true,
                
            }
            
        }
     )

    const userProfile_taskInfo = await prisma.taskEmployee.findMany({
        where:{
            userId:userId
        },
        select:{
            isCompleted:true,
            Task:{
                select:{
                    taskId:true,
                    taskName:true,
                    progression:true,
                    deadline:true,
                    startTime:true,
                    TaskTag:{
                        select:{
                            Tags:{
                                select:{
                                    tagId:true,
                                    tagName:true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    let expertise = {
        java : 0,
        python : 0,
        c : 0,
        javascript : 0
    }

    userProfile_taskInfo.forEach(task => {
        task.Task.TaskTag.forEach(tag => {
            
            if(tag.Tags.tagName === 'C++'){
                expertise.c = expertise.c + 1
            }
            else if(tag.Tags.tagName === 'Java'){
                expertise.java = expertise.java + 1
            }
            else if(tag.Tags.tagName === 'JavaScript'){
                expertise.javascript = expertise.javascript + 1
            }
            else if(tag.Tags.tagName === 'Python'){
                expertise.python = expertise.python + 1
            }
        })
    })

    let returnExpertise = []
    if(expertise.java > 0){
        returnExpertise.push({tag : 'Java' , projects : expertise.java})
    }
    if(expertise.python > 0){
        returnExpertise.push({tag : 'Python' , projects : expertise.python})
    }
    if(expertise.c > 0){
        returnExpertise.push({tag : 'C++' , projects : expertise.c})
    }
    if(expertise.javascript > 0){
        returnExpertise.push({tag : 'JavaScript' , projects : expertise.javascript})
    }

    //console.log(expertise)

    const userProfile_taskAssignmentReq = await prisma.taskAssignmentRequest.findMany({
        where:{
            employeeId:userId
        },
        select:{
            creationDate:true,
            User_TaskAssignmentRequest_managerIdToUser:{
                select:{
                    userId:true,
                    userName:true  
                }
            },
            Task:{
                select:{
                    taskId:true,
                    taskName:true,
                }
            }
        }
        
    })

    // console.log(expertise)
    //  userProfile.userId = userProfile.userId.toString()
    // return userProfile
    const userProfile = {
        userProfile_userInfo,
        userProfile_taskInfo,
        userProfile_taskAssignmentReq,
        returnExpertise
    }
    return userProfile
}


//get user home page data
async function userHomePageData(userId){
    const userHomePage = await prisma.user.findUnique({
        where:{
            userId : userId,
        },
        select:{
            userName:true,
            TaskEmployee:{
                select:{
                    Task:{
                        select:{
                            taskName:true,
                            deadline:true,
                        }

                    }
                }
                    
            
            }
        }
    })
    
    return userHomePage
}

// get user task page data
async function getUserTaskComment(userId , taskId){
    const taskComment = await prisma.userTaskComment.findMany({
        where:{
            taskId:taskId
        },
        select:{
            creationTime:true,
            User:{
                select:{
                    userId:true,
                    userName:true
                }
            },
            Task:{
                select:{
                    taskId:true,
                    taskName:true,
                    deadline:true,
                    progression:true,
                    startTime:true
                }   
            },
            Comments:{
                select:{
                    commentId:true,
                    commentMessage:true
                }
            }

        }
    })

    const taskDetails = await prisma.task.findUnique({
        where:{
            taskId : taskId
        },
        select:{
            taskId:true,
            taskName:true,
            startTime:true,
            deadline:true,
            progression:true
        }
    })

    const taskCommentData = {
        taskDetails,
        taskComment
    };

    return taskCommentData
}


//get user notification page data
async function getUserNotificationData(userId){
    const userNotification = await prisma.userTaskNotification.findMany({
        where:{
            userId:userId
        },
        select:{
            creationTime:true,
            Notifications:{
                select:{
                    notificationId:true,
                    notificationMessage:true,
                    notificationType:true
                }
            },
            Task:{
                select:{
                    taskId:true,
                    taskName:true
                }
            }
        }
    })

    return userNotification
}

//post req data

// update user profile data
async function updateUserProfileData(userId , updatedProfile){

    console.log(updatedProfile)
        const updatedUser = await prisma.user.update({
          where: { 
            userId:userId
        },
          data: { 
            userName: updatedProfile.name ,
            contactNo: parseInt(updatedProfile.contactNo , 10),
            email:updatedProfile.email,
          },
        });

        return updatedUser
    
      
}


// update user password data
async function updatePasswordData(userId , updatedProfile){
    
        const updatedUser = await prisma.user.update({
          where: { 
            userId : userId
          },
          data: { 
            password: updatedProfile.password ,
          },
        });

        return updatedUser
    
      
}

// update user availability data
async function updateUserAvailability(userId){
    const {isAvailable} = await prisma.user.findUnique({
        where:{
            userId:userId
        },
        select:{
            isAvailable:true
        }
    })
    const updatedAvailability = await prisma.user.update({
        where:{
            userId:userId
        },
        data:{
            isAvailable:!isAvailable
        }
    })

    return updatedAvailability
}

//handle when user do a comment in a task
async function createUserTaskComment(userId , taskId , msg){
    // console.log(userId + " " + taskId + " " + msg)
 
     const newComment = await prisma.comments.create({
         data:{
             commentMessage:msg
         }
     })
 
     const newCommentId = newComment.commentId
     //console.log(newCommentId)
 
     const updateUserTaskComment = await prisma.userTaskComment.create({
         data:{
             userId:userId,
             taskId:taskId,
             commentId:newCommentId,
             creationTime:new Date()
         }
     })
 
     //console.log(updateUserTaskComment)
     return updateUserTaskComment
 
}

async function deleteCommentofUserTask(userId , taskId , commentId){
    const deletedComment = await prisma.userTaskComment.delete({
        where:{
            userId_taskId_commentId:{
                userId:userId,
                taskId:taskId,
                commentId:commentId
            }
        }
    })

    const deletedCommentFromComment = await prisma.comments.delete({
        where:{
            commentId:commentId
        }
    })

    return deletedComment
}

async function updateProgrssionOfProject(taskId){
    console.log(taskId)
    const projectOfThisTask = await prisma.projectTask.findMany({
        where:{
            taskId:taskId
        },
        select:{
            projectId:true
        }
    })

    const tasksOfThisProject = await prisma.projectTask.findMany({
        where:{
            projectId:projectOfThisTask[0].projectId
        },
        select:{
            taskId:true,
            Task:{
                select:{
                    progression:true
                }
            }
        }
    })

    let allTaskProgression = 0
    let allTaskCount = 0
    tasksOfThisProject
    .forEach(task => {
        allTaskCount = allTaskCount + 1
        allTaskProgression = allTaskProgression + task.Task.progression
    })

    const progressionOfThisProject = (allTaskProgression / allTaskCount) 

    if(progressionOfThisProject === 100){
        const updatedProject = await prisma.project.update({
            where:{
                projectId:projectOfThisTask[0].projectId
            },
            data:{
                progression:progressionOfThisProject,
                endTime:new Date()
            }
        })
    }
    else{
        const updatedProject = await prisma.project.update({
            where:{
                projectId:projectOfThisTask[0].projectId
            },
            data:{
                progression:progressionOfThisProject
            }
        })
    }

    
}

async function updateProgressionOfParentTask(parentTask){
    const subTasks = await prisma.subTasks.findMany({
        where:{
            parentTaskId:parentTask
        },
        select:{
            childTaskId:true,
            Task_SubTasks_childTaskIdToTask:{
                select:{
                    progression:true
                }
            }
        }
    })

    let allSubTaskProgression = 0
    let allSubTaskCount = 0

    subTasks.forEach(subTask => {
        allSubTaskCount = allSubTaskCount + 1
        allSubTaskProgression = allSubTaskProgression + subTask.Task_SubTasks_childTaskIdToTask.progression
    })

    const progressionOfParentTask = allSubTaskProgression / allSubTaskCount

    if(progressionOfParentTask === 100){
        const updatedParentTask = await prisma.task.update({
            where:{
                taskId:parentTask
            },
            data:{
                progression:progressionOfParentTask,
                endTime:new Date()
            }
        })
    }
    else{
        const updatedParentTask = await prisma.task.update({
            where:{
                taskId:parentTask
            },
            data:{
                progression:progressionOfParentTask,
            }
        })
    }

    const parentTaskOfThisParentTask = await prisma.subTasks.findMany({
        where:{
            childTaskId:parentTask
        },
        select:{
            parentTaskId:true
        }
    })

    if(parentTaskOfThisParentTask.length === 1){
        await updateProgressionOfParentTask(parentTaskOfThisParentTask[0].parentTaskId)
    }
    else if(parentTaskOfThisParentTask.length === 0){
        await updateProgrssionOfProject(parentTask)
    }
}

// handle when a user has done his task
async function updateUserTaskProgression(userId , taskId){
    //console.log(userId + " " + taskId)
    
    const updatedUserTask = await prisma.taskEmployee.update({
        where: {
            taskId_userId: {
                taskId: taskId,
                userId: userId
            }
        },
        data: {
            isCompleted: true
        }
    })

    const userWiththisTask = await prisma.taskEmployee.findMany({
        where:{
            taskId:taskId
        },
        select:{
            userId:true,
            isCompleted:true
        }
    })

    let allCompletedCount = 0
    let allUserCount = 0

    console.log(userWiththisTask)

    userWiththisTask.forEach(user => {
        allUserCount = allUserCount + 1
        if(user.isCompleted === true){
            allCompletedCount = allCompletedCount + 1
        }
    })

    const progressionOfThisTask = (allCompletedCount / allUserCount) * 100

    if(progressionOfThisTask === 100){
        const updatedTask = await prisma.task.update({
            where:{
                taskId:taskId
            },
            data:{
                progression:progressionOfThisTask,
                endTime:new Date()
            }
        })
    }
    else{
        const updatedTask = await prisma.task.update({
            where:{
                taskId:taskId
            },
            data:{
                progression:progressionOfThisTask
            }
        })
    }

    //recursively change the progression of the parent tasks
    const parentTask = await prisma.subTasks.findMany({
        where: {
            childTaskId: taskId
        },
        select:{
            parentTaskId:true
        }
    })

    console.log(parentTask)

    if(parentTask.length === 1){
        await updateProgressionOfParentTask(parentTask[0].parentTaskId)
    }

    // eta on korte hobe    
    // else if (parentTask.length === 0){
    //     await updateProgrssionOfProject(taskId)
    // }


   

    //console.log(allCompletedCount + " " + allUserCount)




    
}

//approve or ignore task assignment request

async function approveTaskAssignmentRequest(employeeId , taskId , managerId){
    console.log(employeeId + " " + taskId + " " + managerId)
    const approvedTaskAssignmentRequest = await prisma.taskAssignmentRequest
    .delete({
        where: {
            taskId_employeeId_managerId: {
                taskId: taskId,
                employeeId: employeeId,
                managerId: managerId
            }
        }
    })

    const newTaskEmployee = await prisma.taskEmployee.create({
        data:{
            userId:employeeId,
            taskId:taskId
        }
    })

    // console.log(newTaskEmployee)

    const creationDate = new Date()

    const userInfo = await prisma.user.findUnique({
        where:{
            userId:employeeId
        },
        select:{
            userName:true
        }
    })

    const newNotification = await prisma.notifications.create({
        data: {
          notificationMessage: "Your task has been assigned to " + userInfo.userName + " on " + creationDate.toDateString(),
          notificationType: 0,
          // other fields but not the notificationId
        },
      });

    // console.log(newNotification)

    const userTaskNotification = await prisma.userTaskNotification.create({
        data:{
            userId:managerId,
            taskId:taskId,
            notificationId:newNotification.notificationId,
            creationTime:creationDate
        }
    })

    // console.log(userTaskNotification)
    return userTaskNotification

}

async function ignoreTaskAssignmentRequest(employeeId , taskId , managerId){
    const ignoredTaskAssignmentRequest = await prisma.taskAssignmentRequest
    .delete({
        where:{
            taskId_employeeId_managerId:{
                taskId:taskId,
                employeeId:employeeId,
                managerId:managerId
            }
        }
    })

    const creationDate = new Date()

    const userInfo = await prisma.user.findUnique({
        where:{
            userId:employeeId
        },
        select:{
            userName:true
        }
    })

    const newNotification = await prisma.notifications.create({
        data: {
          notificationMessage: userInfo.userName + " has refused to join your task on " + creationDate.toDateString(),
          notificationType: 0,
          // other fields but not the notificationId
        },
      });

    console.log(newNotification)

    const userTaskNotification = await prisma.userTaskNotification.create({
        data:{
            userId:managerId,
            taskId:taskId,
            notificationId:newNotification.notificationId,
            creationTime:creationDate
        }
    })

    console.log(userTaskNotification)
    return userTaskNotification

}



module.exports = {
    userProfile,
    userHomePageData,
    getUserTaskComment,
    getUserNotificationData,
    //post data
    updateUserProfileData,
    updatePasswordData,
    updateUserAvailability,
    createUserTaskComment,
    deleteCommentofUserTask,
    approveTaskAssignmentRequest,
    ignoreTaskAssignmentRequest,
    updateUserTaskProgression
}