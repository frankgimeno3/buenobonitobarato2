const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const foodEntrySchema = new Schema({
    title: String ,
    image: String,
    description: String,
    price: Number,
     date: {
          bsonType: "date",}
});

const FoodEntry = model("FoodEntry", foodEntrySchema);

module.exports = FoodEntry;