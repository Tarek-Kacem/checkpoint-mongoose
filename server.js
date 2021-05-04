const mongoose = require('mongoose');
const express = require("express");
const app = express();
require("dotenv").config({path: "./config.env"})
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

app.listen(process.env.PORT)