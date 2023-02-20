#Bueno Bonito Barato
Developed as the second project of our web development bootcamp at Ironhack Barcelona .

## About

Hello! Our project is based on good food in the city of Barcelona. Using the Spanish expression "<i>Bueno Bonito Barato</i>" to highlight some of the gastronomical wonders of Barcelona. On this platform members of the public can upload their meals to the site with other users, sharing their images and opinions about their experiences in different restaurants.  This project goes against some the current trends of <i>fine dining </i> and takes eating out back to their humble origins. 

![Project Image](https://www.freepnglogos.com/uploads/food-png/food-grass-fed-beef-foodservice-products-grass-run-farms-4.png  "Project Image")

## Deployment
You can check the app fully deployed [here](??????????).

## Work structure
We have developed this project using [Trello](https://trello.com/b/kPxyQuKG/bueno-bonito-barato) to organize our workflow.

## Installation guide
- Fork this repo
- Clone this repo 

```shell
$ cd ????????
$ npm install
$ npm start
```

## Models
#### User.model.js
```js
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
```
#### FoodEntry.model.js
```js
const foodEntrySchema = new Schema({
    title: String ,
    image: String,
    description: String,
    price: Number,
     date: {
          bsonType: "date",}
});
```
#### Comments.model.js
```js
const foodEntrySchema = new Schema({
    title: String ,
    image: String,
    description: String,
    price: Number,
     date: {
          bsonType: "date",}
});
```
##
```js
const commentSchema = new Schema({
    author: {
      type: String,
      required: true,
      },
    content: {
      type: String,
      required: true,
      },
    createdAt: {
      type: Date,
      default: Date.now,
      },
});

```


## User roles
| Role  | Capabilities                                                                                                                               | Property       |
| :---: | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| User  | Can login/logout. Can read all the food entries. Can create a new entry                                                                    | isAdmin: false |
| Admin | Can login/logout. Can read, edit or delete all the entries. Has full access                                                                | isAdmin: true  |

## Routes
| Method | Endpoint                    | Require                                             | Response (200)                                                        | Action                                                                    |
| :----: | --------------------------- | --------------------------------------------------- |---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| POST   | /signup| const { username, email, password } = req.body      | res.render("users/signup");| Registers the user in the database and returns the logged in user.        |
| POST   | /login | const { email, password } = req.body                | res.render("users/login");| Logs in a user already registered.        
| GET    | /list                   | res.render("/list");     | Returns an array with all the food entries registered in the database.").|
| GET    | /list/:entryId | const { entryId } = req.params| res.send(req.params)| Returns the information of the specified entry ("Restaurant Experience").|
| POST   | /list| const { title, description, url, image, price } = req.body |  res.redirect("list");  | Creates a food entry in the database.|
| PUT    | /list/:entryId | const { entryId } = req.params|res.redirect("/list");| Edits a food entry that already exists on the database.|
| DELETE | /list/:entryId | const { entryId } = req.params|{mensajeError: "Project with *entryId* was removed successfully"}; res.redirect("/list");| Deletes a food entry from the database.                               |                 
| GET    | /profile| | res.render("users/login")| Returns the current user object.                                          |



---

Any doubts? Contact us!
https://github.com/gonsolvis
https://github.com/frankgimeno3/
https://github.com/rubenlopsol