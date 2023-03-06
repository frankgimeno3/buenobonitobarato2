## About Project

Hello! Our project is based on good food in the city of Barcelona. Using the Spanish expression "Bueno Bonito Barato" to highlight some of the gastronomical wonders of Barcelona. On this platform members of the public can upload their meals to the site with other users, sharing their images and opinions about their experiences in different restaurants. This project goes against some the current trends of fine dining and takes eating out back to their humble origins.

![photo](project.png)

### Project Deployment

The project is deployed using fly.dev **[here](https://fly.io/apps/buenobonitobarato2)**

### Work structure

We have developed this project using **[Trello](https://trello.com/b/kPxyQuKG/bueno-bonito-barato)** to organize our workflow.

### Installation guide

Fork and clone this repo and follow the belo instructions

```
    npm install
    npm start
```

### User Roles

| Role      | Capabilities                                                                                                                                      | Properities    |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| **User**  | User can `login/logout` to his/her personal profile and read/delete/create new posts, and leace a comments on his own post plus other users posts | isAdmin: false |
| **Admin** | Admin have access to `login/logout` and read/delete/create new posts/comments on everything in a project                                          | isAdmin: true  |

### Routes

| Method   | Endpoint               | Description                                |
| :------- | :--------------------- | :----------------------------------------- |
| **POST** | `/signup`              | User register DataBase                     |
| **GET**  | `/login`               | User login in his/her profile              |
| **GET**  | `/logout`              | User logged out forom his/her profile      |
| **GET**  | `/user`                | Home page                                  |
| **GET**  | `/user/new-post`       | Render a new form post                     |
| **POST** | `/user/new-post`       | Create new post on DB                      |
| **GET**  | `/user/:postId`        | Get a post and comments base on his ID     |
| **POST** | `/user/new-post`       | Create a comments base related to creator  |
| **POST** | `/user/:postId/delete` | Delete a post                              |
| **GET**  | `/user/:postId/edit`   | Render a form to edit especific post by ID |
| **POST** | `/user/:postId/edit`   | Update the post on DB                      |

### Models:

We have 3 models in our projects as below (users, posts, comments)

```javascript
## User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
);
```

```javascript
## Post model
const postSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    foto: {
      type: String,
    },
    restaurante: {
      type: String,
    },
    detalles: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);
```

```javascript
## Comment model
const commentSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);
```
