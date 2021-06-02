const mongoose = require("mongoose");
const schema = mongoose.Schema;

const user = new schema({
  name: { type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})

module.exports = mongoose.model( "user", user )