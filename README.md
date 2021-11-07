
# Backend Hot takes • Projet 6 DW OpenClassrooms

Backend for the application hot takes which is a project for the OpenClassrooms Web Development path


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_PASSWORD`


## API Reference

#### Signup to the panel

```http
  POST /api/auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |

#### Login to the panel

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Your email |
| `password`      | `string` | **Required**. Your password |

