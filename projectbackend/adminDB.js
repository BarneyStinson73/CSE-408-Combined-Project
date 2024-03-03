const prisma = require('./prismaClient')

async function getHomePageData(userId){
    const homePageDataReminder_TaskData = await prisma.taskManager.findMany({
        where:{
            managerId : userId
        },
        select:{
            Task:{
                select:{
                    taskId:true,
                    taskName:true,
                    deadline:true
                }
            }
        }
    })

    const homePageData_ProfileData = await prisma.projectManager.findMany({
        where:{
            managerId : userId
        },
        select:{
            Project:{
                select:{
                    projectId:true,
                    projectName:true,
                    deadline:true,
                    progression:true
                }
            }
        }
    })

    const adminHomePageData = {
        homePageDataReminder_TaskData,
        homePageData_ProfileData
    }

    return adminHomePageData
}

async function getProfilePageData(userId){
    const adminProjects = await prisma.projectManager.findMany({
        where:{
            managerId : userId
        },
        select:{
            Project:{
                select:{
                    projectId:true,
                    projectName:true,
                    progression:true,
                    deadline:true,
                    ProjectTag:{
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

    const adminTasks = await prisma.taskManager.findMany({
        where:{
            managerId:userId
        },
        select:{
            Task:{
                select:{
                    taskId:true,
                    taskName:true,
                    progression:true,
                    deadline:true,
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
    const adminProfileInfo = await prisma.user.findUnique({
        where:{
            userId : userId
        },
        select:{
            userId:true,
            userName:true,
            contactNo:true,
            email:true,
            isAvailable:true,
            position:true
        }
    })

    let expertise = {
        java : 0,
        python : 0,
        c : 0,
        javascript : 0
    }

    adminTasks.forEach(task => {
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

    // console.log(expertise)

    const adminProfilePageData = {
        adminProjects,
        adminTasks,
        adminProfileInfo,
        expertise
    }

    return adminProfilePageData
}

async function getTaskPageDataforAdmin(userId , taskId){
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

    const taskInfo = await prisma.task.findUnique({
        where:{
            taskId:taskId
        },
        select:{
            taskId:true,
            taskName:true,
            startTime:true,
            deadline:true,
            progression:true
            
        }
    })

    // console.log(taskInfo)

    const subTasks = await getSubTasks(taskId)

    const tasksWithSubTasksInfo = {
        taskId:taskInfo.taskId,
        taskName:taskInfo.taskName,
        startTime:taskInfo.startTime,
        deadline:taskInfo.deadline,
        progression:taskInfo.progression,
        subtasks:subTasks
    }


    //recursive loop for getting all the subtasks in a subtask , then add it to the return object
    const getAdminTaskPageData = {
        tasksWithSubTasksInfo,
        taskComment
    }

    return getAdminTaskPageData
}



async function getSubTasks(parentTaskId) {
    let tasksWithSubTasks = []
    
   const subTasksforThisTask = await prisma.subTasks.findMany({
    where:{
        parentTaskId:parentTaskId
    },
    include:{
        Task_SubTasks_childTaskIdToTask:{
            select:{
                taskId:true,
                taskName:true,
                progression:true,
                deadline:true,
                startTime:true,
                
                
            }
        }
      
    }

   })



   for (const subTask of subTasksforThisTask){
    const childTaskId = subTask.childTaskId
    const subTaskOfChildTask = await getSubTasks(childTaskId)


    const dependencyTaskInfo = await prisma.task.findUnique({
        where:{
            taskId:childTaskId
        },
        select:{
            DependentTask_DependentTask_dependentIdToTask:{
                select:{
                    Task_DependentTask_masterIdToTask:{
                        select:{
                            taskName:true,
                            taskId:true,
                            progression:true,
                            deadline:true,
                            startTime:true
                        }
                    }
                }
                
            }

        }
    })
    tasksWithSubTasks.push({
        taskId : childTaskId,
        taskName : subTask.Task_SubTasks_childTaskIdToTask.taskName,
        startTime : subTask.Task_SubTasks_childTaskIdToTask.startTime,
        deadline : subTask.Task_SubTasks_childTaskIdToTask.deadline,
        progression : subTask.Task_SubTasks_childTaskIdToTask.progression,
        dependencyTask : dependencyTaskInfo.DependentTask_DependentTask_dependentIdToTask,
        subTasks : subTaskOfChildTask
    })
   }

    return tasksWithSubTasks
  }
  

async function getAdminProjectPageData(userId , projectId) {
   // console.log(userId + " " + projectId)
    const projectTasks = await prisma.projectTask.findMany({
      where: {
        projectId: projectId,
      },
      select:{
        Task:{
            select:{
                taskId:true,
                taskName:true,
                startTime:true,
                deadline:true,
                progression:true,
                DependentTask_DependentTask_dependentIdToTask:{
                    select:{
                        Task_DependentTask_masterIdToTask:{
                            select:{
                                taskName:true,
                                taskId:true,
                                progression:true,
                                deadline:true,
                                startTime:true
                            }
                        }
                    }
                
                }
            }
        }
      }
    });
    //console.log(projectTasks)

    const projectInfo = await prisma.project.findUnique({
        where:{
            projectId:projectId
        },
        select:{
            projectId:true,
            projectName:true,
            progression:true,
            startTime:true,
            deadline:true
        }
    })
   // console.log(projectInfo)
  
    //const tasksWithSubTasks: any[] = [];
    let tasksWithSubTasks = []
  
    for (const projectTask of projectTasks) {
      const task = projectTask.Task;
      //console.log(task)
      const subTasks = await getSubTasks(task.taskId);
      //console.log(subTasks)
      tasksWithSubTasks.push({
        taskId: task.taskId,
        taskName: task.taskName,
        startTime: task.startTime,
        deadline: task.deadline,
        progression: task.progression,
        dependencyTask:task.DependentTask_DependentTask_dependentIdToTask,
        //dependencyTask:task.DependentTask_DependentTask_dependentIdToTask.
        subTasks,
        
      });
    }

    //console.log(tasksWithSubTasks)
    //return tasksWithSubTasks
    const adminProjectData = {
        projectId:projectInfo.projectId,
        projectName:projectInfo.projectName,
        startTime:projectInfo.startTime,
        deadline:projectInfo.deadline,
        progression:projectInfo.progression,
        tasks:tasksWithSubTasks
    }
  
    return adminProjectData;
  }



async function getNotificationData(userId){
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
// update profile
async function updateAdminProfile(userId , profileInfo){ 
    const updatedProfile = await prisma.user.update({
        where:{
            userId:userId
        },
        data:{
            userName:profileInfo.userName,
            contactNo:profileInfo.contactNo,
            email:profileInfo.email,
            isAvailable:profileInfo.isAvailable
        }
    })

    return updatedProfile
}
// update password
async function updateAdminPassword(userId , password){      
    const updatedPassword = await prisma.user.update({
        where:{
            userId:userId
        },
        data:{
            password:password
        }
    })

    return updatedPassword
}
// update availability
async function updateAdminAvailability(userId){
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
// userTaskComment
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

async function createNewProject(userId , projectInfo){
    const newProject = await prisma.project.create({
        data:{
            projectName:projectInfo.projectName,
            progression:0,
            startTime:new Date(projectInfo.startTime),
            deadline:new Date(projectInfo.deadline),
            isExtendedLateInTime:0
        }
    })

    const newProjectId = newProject.projectId
    
    const projectManager = await prisma.projectManager.create({
        data:{
            projectId:newProjectId,
            managerId:userId
        }
    })

    
}

async function createNewTask(userId , taskInfo){
    const newTask = await prisma.task.create({
        data:{
            taskName:taskInfo.taskName,
            startTime:new Date(taskInfo.startTime),
            deadline:new Date(taskInfo.deadline),
            progression:0
        }
    })

    const newTaskId = newTask.taskId

    const taskManager = await prisma.taskManager.create({
        data:{
            taskId:newTaskId,
            managerId:userId
        }
    }
    )
}

async function createNewSubTask(userId , subTaskInfo){
    const newSubTask = await prisma.task.create({
        data:{
            taskName:subTaskInfo.taskName,
            startTime:new Date(subTaskInfo.startTime),
            deadline:new Date(subTaskInfo.deadline),
            progression:0
        }
    })

    const newSubTaskId = newSubTask.taskId

    const taskManager = await prisma.taskManager.create({
        data:{
            taskId:newSubTaskId,
            managerId:userId
        }
    }
    )
}

async function updateTaskDeadlineExtension(userId , taskId , newDeadline){
    //console.log(newDeadline)
    let date = new Date(newDeadline.slice(0,10))
    date.setDate(date.getDate() + 1)
    const updatedTask = await prisma.task.update({
        where:{
            taskId:taskId
        },
        data:{
            deadline:date,
            isExtendedLateInTime:1

        }
    })

    return updatedTask
}

async function updateProjectDeadlineExtension(userId , projectId , newDeadline){
//    console.log(newDeadline)
//    console.log(typeof(newDeadline))
    let date = new Date(newDeadline.slice(0,10))
    date.setDate(date.getDate() + 1)
//    console.log(date)
//    console.log(typeof(date))
    const updatedProject = await prisma.project.update({
        where:{
            projectId:projectId
        },
        data:{
            deadline:date,
            isExtendedLateInTime:1
        }
    })

    return updatedProject
}



module.exports = {
    getHomePageData,
    getProfilePageData,
    getNotificationData,
    getTaskPageDataforAdmin,
    getAdminProjectPageData,
    updateAdminAvailability,
    createUserTaskComment,
    updateTaskDeadlineExtension,
    updateProjectDeadlineExtension,
}