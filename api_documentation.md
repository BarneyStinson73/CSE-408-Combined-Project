# Architecture


# Stack

- Frontend: Svelte
- Backend: Node.js (Express)


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

##### Response Body

```json
{
    "access_token": "123",
    "refresh_token": "123"
}
```

### `GET` Logout

| API Endpoint               | HTTP Method | Response Code |
| -------------------------- | :---------: | :-----------: |
| [victor.com/logout]()      |    `GET`    |      200      |
|                            |             |               |

##### Request Body

```json

```

##### Response Body

```json

```

### `POST` Search Collaborators(User)

| API Endpoint               | HTTP Method | Response Code |
| -------------------------- | :---------: | :-----------: |
| [api/user/search]()      |    `GET`    |      200      |
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
{
[
  "name" : "string",
  "position":"string"
  
]
}
```

### `GET` Personal Account Details on Search(User)

| API Endpoint          | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [api/user/search/account/{account_id}]() |    `GET`    |      200      |

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
| [api/user/account/{account_id}]() |    `GET`    |      200      |
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
| [api/user/account/{account_id}/update]() |    `POST`    |      200      |
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
{
[
  "name" : "string",
  "position":"string"
  "account_id": "string"
]
}
```

### `GET` Personal Account Details on Search(Admin)

| API Endpoint          | HTTP Method | Response Code |
| --------------------- | :---------: | :-----------: |
| [admin/search/account/{account_id}]() |    `GET`    |      200      |

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
| [api/admin/account/{account_id}]() |    `GET`    |      200      |
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
| [api/admin/account/{account_id}/update]() |    `POST`    |      200      |
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
