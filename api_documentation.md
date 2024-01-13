# Architecture
Cikent-Server Architecture

# Stack

- Frontend: React
- Backend: Node.js (Express)
- Database: PostgreSQL


# API Documentation

## Authentication

### `POST` Login

| API Endpoint              | HTTP Method | Response Code |
| ------------------------- | :---------: | :-----------: |
| [/user/login]() |             `POST`    |      200      |
|                           |             |               |

##### Request Body

```json
{
  "email": "string",
  "password": "string"
  "type": "string"
}
```

##### Response Body(Success)

```json
{
    "access_token": "123"
}
```

`NOTE`: This access token is to be used for all subsequent requests to the API. A user can only be logged in to one account at a time. If a user logs in to another account, the previous access token will be invalidated.

| API Endpoint              | HTTP Method | Response Code |
| ------------------------- | :---------: | :-----------: |
| [/user/login]() |             `POST`    |      401      |
|                           |             |               |

##### Request Body

```json
{
  "email": "string",
  "password": "string"
  "type": "string"
}
```

##### Response Body(Failure)

```json
{
    "message": "Invalid Credentials"
}
```


### `GET` Logout

| API Endpoint               | HTTP Method | Response Code |
| -------------------------- | :---------: | :-----------: |
| [/logout]()      |    `GET`    |      200      |
|                            |             |               |

##### Request Body

```json

```

##### Response Body

```json

```



### `GET` Notifications

| API Endpoint               | HTTP Method | Response Code |
| -------------------------- | :---------: | :-----------: |
| [/notifications]()      |    `GET`    |      200      |
|                            |             |               |

##### Request Body

```json

```

##### Response Body

```json
[
  {
    "notification_id": "string",
    "notification": "string",
    "notification_type": "string",
    "notification_date": "string",
    "notification_time": "string",
    "notification_status": "string"
  }
]
```


### `POST` Search Collaborators(User)

| API Endpoint               | HTTP Method | Response Code |
| -------------------------- | :---------: | :-----------: |
| [api/user/search]()      |    `POST`    |      200      |
|                            |             |               |

##### Request Body

```json
{
  "name": "string",
  "position": "string"
}
```

##### Response Body

```json
[
  {  
  "name" : "string",
  "position":"string"
  }
]

```

### `GET` Personal Account Details on Search(User)

| API Endpoint          | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/user/search/account]() |    `GET`    |      200      |

##### Request Body

```json
{
  "account_id": "string"
}
```
##### Response Body

```json
{ 
  "account_id": "string",
  "account_name": "string",
  "position": "string",
  "email": "string",
  "contact": "string",
  "expertise":[
    {
      "name": "string",
      "succesful": 5,
    }
  ],
  "records": [
    {
      "category": "string",
      "percentage": "string",
      
    }
    "number of projects": 5,
  ]
  "projects": [
    {
      "name": "string",
      "status": "string",
      "start_date": "string",
      "end_date": "string",
      "progress": "string",
    }
  ]
}
```

### `GET` Personal Account Details(User)

| API Endpoint          | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/user/account]() |    `GET`    |      200      |
|                       |             |               |

##### Request Body

```json

```

##### Response Body

```json
{
  "account_id": "string",
  "account_name": "string",
  "position": "string",
  "email": "string",
  "contact": "string",
  "privilege": false,
  "expertise":[
    {
      "name": "string",
      "succesful": 5,
    }
  ],
  "records": [
    {
      "category": "string",
      "percentage": "string",
      
    }
    "numer of projects": 5,
  ]
  "projects": [
    {
      "name": "string",
      "manager": "string",
      "collaborators": [
        "name":"string"
      ],
      "status": "string",
      "start_date": "string",
      "end_date": "string",
      "progress": "string",
    }
  ]
}
```

### `POST` Update Account Details(User)

| API Endpoint    | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/user/account/update]() |    `POST`    |      200      |
|                       |             |               |

##### Request Body

```json
{
  "account_id": "string",
  "account_name": "string",
  "account_type": "string",
  "position": "string",
  "email": "string",
  "contact": "string",
}
```
##### Response Body

```json
{
  "status": "success"
}
```

### `GET` Project Details(User)

| API Endpoint          | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/user/project/{project_id}]() |    `GET`    |      200      |
|                       |             |               |

##### Request Body

```json

```

##### Response Body

```json
{
  "project_id": "string",
  "project_name": "string",
  "manager": "string",
  "collaborators": [
    "name":"string"
  ],
  "status": "string",
  "start_date": "string",
  "end_date": "string",
  "progress": "string",
  "tasks": [
    {
      "task_id": "string",
      "task_name": "string",
      "task_description": "string",
      "task_status": "string",
      "start_date": "string",
      "end_date": "string",
      "progress": "string",
      "assigned_to": "string",
      "assigned_by": "string",
      "comments": [
        {
          "comment_id": "string",
          "comment": "string",
          "commented_by": "string",
          "commented_on": "string"
        }
      ]
    }
  ]

  "last_updated": "string"
}
```
### `Get` Task & Sub-task Details(User)

| API Endpoint          | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/user/task/{task_id}]() |    `GET`    |      200      |
|                       |             |               |

##### Request Body

```json

```

##### Response Body

```json
{ 
  "project_id": "string",
  "project_name": "string",
  "task_id": "string",
  "task_name": "string",
  "task_description": "string",
  "task_status": "string",
  "start_date": "string",
  "end_date": "string",
  "progress": "string",
  "assigned_to": "string",
  "assigned_by": "string",
  "comments": [
    {
      "comment_id": "string",
      "comment": "string",
      "commented_by": "string",
      "commented_on": "string"
    }
  ]
  "sub-task": [
    {
      "sub-task_id": "string",
      "sub-task_name": "string",
      "sub-task_description": "string",
      "sub-task_status": "string",
      "push_to_next": false,
      "start_date": "string",
      "end_date": "string",
      "progress": "string",
      "assigned_to": "string",
      "assigned_by": "string",
      "comments": [
        {
          "comment_id": "string",
          "comment": "string",
          "commented_by": "string",
          "commented_on": "string"
        }
      ]
      "dependencies": [
        {
          "sub-task_id": "string",
          "sub-task_name": "string"
        }
      ]
    }
  ]
  "last_updated": "string"
}
```
### `POST` Push Sub-Task to Next Phase(User)

| API Endpoint    | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/user/task/{task_id}/push]() |    `POST`    |      200      |
|                       |             |               |



##### Request Body

```json
{
  "task_id": "string",
  "sub-task_id": "string",
}
```
##### Response Body

```json
{
  "task_status": "string",
  "status": "success"
}
```



### `POST` Search Collaborators(Admin)

| API Endpoint               | HTTP Method | Response Code |
| -------------------------- | :---------: | :-----------: |
| [admin/search]()      |    `GET`    |      200      |
|                            |             |               |

##### Request Body

```json
{
  "name": "string",
  "position": "string"
}
```

##### Response Body

```json
[
  {  
  "name" : "string",
  "position":"string"
  
  }
]
```

### `GET` Personal Account Details on Search(Admin)

| API Endpoint          | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [admin/search/account]() |    `GET`    |      200      |

##### Request Body

```json
{
  "account_id": "string",
}
```

##### Response Body

```json
{ 
  "account_id": "string",
  "account_name": "string",
  "position": "string",
  "email": "string",
  "contact": "string",
  "expertise":[
    {
      "name": "string",
      "succesful": 5,
    }
  ],
  "records": [
    {
      "category": "string",
      "percentage": "string",
      
    }
    "number of projects": 5,
  ]
  "projects": [
    {
      "name": "string",
      "status": "string",
      "start_date": "string",
      "end_date": "string",
      "progress": "string",
    }
  ]
}
```



### `GET` Personal Account Details(Admin)

| API Endpoint          | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/admin/account]() |    `GET`    |      200      |
|                       |             |               |

##### Request Body

```json

```

##### Response Body

```json
{
  "account_id": "string",
  "account_name": "string",
  "position": "string",
  "email": "string",
  "contact": "string",
  "privilege": true,
  "expertise":[
    {
      "name": "string",
      "succesful": 5,
    }
  ],
  "records": [
    {
      "category": "string",
      "percentage": "string",
      
    }
    "numer of projects": 5,
  ]
  "projects": [
    {
      "name": "string",
      "manager": "string",
      "collaborators": [
        "name":"string"
      ],
      "status": "string",
      "start_date": "string",
      "end_date": "string",
      "progress": "string",
    }
  ]
}
```

### `POST` Update Account Details(Admin)

| API Endpoint    | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/admin/account/update]() |    `POST`    |      200      |
|                       |             |               |

##### Request Body

```json
{
  "account_id": "string",
  "account_name": "string",
  "account_type": "string",
  "position": "string",
  "email": "string",
  "contact": "string",
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `GET` Project Details(Admin)

| API Endpoint          | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/admin/project/{project_id}]() |    `GET`    |      200      |
|                       |             |               |

##### Request Body

```json

```

##### Response Body

```json
{
  "project_id": "string",
  "project_name": "string",
  "manager": "string",
  "collaborators": [
    "name":"string"
  ],
  "status": "string",
  "start_date": "string",
  "end_date": "string",
  "progress": "string",
  "tasks": [
    {
      "task_id": "string",
      "task_name": "string",
      "task_description": "string",
      "task_status": "string",
      "start_date": "string",
      "end_date": "string",
      "progress": "string",
      "assigned_to": "string",
      "assigned_by": "string",
      "comments": [
        {
          "comment_id": "string",
          "comment": "string",
          "commented_by": "string",
          "commented_on": "string"
        }
      ]
    }
  ]

  "last_updated": "string"
}
```

### `GET` Create New Project(Admin)

| API Endpoint    | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/admin/project/create]() |    `POST`    |      200      |
|                       |             |               |

##### Request Body

```json
{

}
```

##### Response Body

```json
{

  "manager":[
    {
      "name": "string",
      "account_id": "string"
    }
  ],
  "collaborators":[
    {
      "name": "string",
      "account_id": "string"
    }
  ],
  "special_privileged_collaborators":[
    {
      "name": "string",
      "account_id": "string"
    }
  ]
  "status": "success"
}
```



### `POST` Update Project Details(Admin)

| API Endpoint    | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/admin/project/{project_id}/update]() |    `POST`    |      200      |
|                       |             |               |

##### Request Body

```json
{
  "project_name": "string",
  "manager": "string",
  "collaborators": [
    "name":"string"
  ],
  "special_privileged_collaborators": [
    "name":"string"
  ],
  "status": "string",
  "start_date": "string",
  "end_date": "string",
  "progress": "string",
}
```

##### Response Body

```json
{
  "project_id": "string",
  "status": "success"
}
```

### `GET` Create New Task(Admin)

| API Endpoint    | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/admin/project/{project_id}/task/create]() |    `POST`    |      200      |
|                       |             |               |

##### Request Body

```json
{

}
```
##### Response Body

```json
{
  
}
```

### `POST` Update Task Details(Admin)

| API Endpoint    | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/admin/project/{project_id}/task/{task_id}/update]() |    `POST`    |      200      |
|                       |             |               |

##### Request Body

```json
{
  "task_name": "string",
  "task_description": "string",
  "task_status": "string",
  "start_date": "string",
  "end_date": "string",
  "progress": "string",
  "assigned_to": [
    "name":"string"
  
  ],
  "assigned_by": "string",
}
```

##### Response Body

```json
{
  "task_id": "string",
  "status": "success"
}
```

### `GET` Create New Sub-Task(Admin)

| API Endpoint    | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/admin/project/{project_id}/task/{task_id}/sub-task/create]() |    `POST`    |      200      |

##### Request Body

```json
{

}
```

##### Response Body

```json
{
  "project_id": "string",
  "task_id": "string",
  "previously_created": [
    {
      "sub-task_id": "string",
      "sub-task_name": "string"
    }
  ]
}
```

### `POST` Update Sub-Task Details(Admin)

| API Endpoint    | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/admin/project/{project_id}/task/{task_id}/sub-task/{sub-task_id}/update]() |    `POST`    |      200      |
|                       |             |               |

##### Request Body

```json
{
  "sub-task_name": "string",
  "sub-task_description": "string",
  "sub-task_status": "string",
  "start_date": "string",
  "end_date": "string",
  "progress": "string",
  "assigned_to": [
    "name":"string"
  
  ],
  "assigned_by": "string",
  "dependencies": [
    {
      "sub-task_id": "string",
      "sub-task_name": "string"
    }
  ]
}
```

##### Response Body

```json
{
  "sub-task_id": "string",
  "status": "success"
}
```

### `POST` Extend Project Deadline(Admin)

| API Endpoint    | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/admin/project/{project_id}/extend]() |    `POST`    |      200      |
|                       |             |               |

##### Request Body

```json
{
  "project_id": "string",
  "end_date": "string",
}
```

##### Response Body

```json
{
  "status": "success"
}
```


### `Get` Task & Sub-task Details(Admin)

| API Endpoint          | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/user/task/{task_id}]() |    `GET`    |      200      |
|                       |             |               |

##### Request Body

```json

```

##### Response Body

```json
{
  "task_id": "string",
  "task_name": "string",
  "task_description": "string",
  "task_status": "string",
  "push_to_next": false,
  "start_date": "string",
  "end_date": "string",
  "progress": "string",
  "assigned_to": "string",
  "assigned_by": "string",
  "comments": [
    {
      "comment_id": "string",
      "comment": "string",
      "commented_by": "string",
      "commented_on": "string"
    }
  ]
  "sub-task": [
    {
      "sub-task_id": "string",
      "sub-task_name": "string",
      "sub-task_description": "string",
      "sub-task_status": "string",
      "start_date": "string",
      "end_date": "string",
      "progress": "string",
      "assigned_to": "string",
      "assigned_by": "string",
      "comments": [
        {
          "comment_id": "string",
          "comment": "string",
          "commented_by": "string",
          "commented_on": "string"
        }
      ]
      "dependencies": [
        {
          "sub-task_id": "string",
          "sub-task_name": "string",
          "type": "string"
        }
      ]
    }
  ]
  "last_updated": "string"
}
```

### `POST` Push Sub-Task to Next Phase(Admin)

| API Endpoint    | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/user/task/{task_id}/push]() |    `POST`    |      200      |
|                       |             |               |

##### Request Body

```json
{
  "task_id": "string",
  "sub-task_id": "string",
}
```

##### Response Body

```json
{
  "status": "success"
}
```

### `GET` Gantt Chart(Admin)

| API Endpoint    | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/admin/project/{project_id}/gantt]() |    `GET`    |      200      |
|                       |             |               |

##### Request Body

```json

```

##### Response Body

```json
{
  "project_id": "string",
  "project_name": "string",
  "tasks": [
    {
      "task_id": "string",
      "task_name": "string",
      "assigned_to": "string",
      "assigned_by": "string",
    }
  ]
  "sub-task": [
    {
      "sub-task_id": "string",
      "sub-task_name": "string",
      "sub-task_status": "string",
      "start_date": "string",
      "end_date": "string",
      "progress": "string",
      "assigned_to": "string",
      "assigned_by": "string",
      "dependencies": [
        {
          "sub-task_id": "string",
          "sub-task_name": "string",
          "type": "string"
        }
      ]
    }
  ]
  "cycle_start": "string",
  "cycle_end": "string",
}
```
`NOTE`: Gantt Chart will be available to only Scrum Master and Project Manager. The cycle start and end dates are the start and end dates of the project. The Gantt chart will be generated for the entire duration of the project.
